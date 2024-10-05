use candid::{CandidType, Principal};
use getrandom::Error;
use ic_cdk::api::management_canister::ecdsa::{
    ecdsa_public_key, sign_with_ecdsa, EcdsaCurve, EcdsaKeyId, EcdsaPublicKeyArgument,
    SignWithEcdsaArgument,
};
use serde::{Deserialize, Serialize};
use std::convert::TryFrom;

use crate::{error::user_error::ErrorUser, repository::event_repository};

#[derive(CandidType, Serialize, Deserialize, Debug)]
pub struct Ticket {
    pub event_id: u128,
    user: Principal,
    pub event_name: String,
}

impl Ticket {
    pub fn new(event_id: u128, user: Principal, event_name: String) -> Self {
        Self {
            event_id,
            user,
            event_name,
        }
    }
    
}

#[derive(CandidType, Serialize, Debug)]
pub struct TicketSignature {
    pub signature_hex: String,
}

#[derive(CandidType, Serialize, Debug)]
pub struct TicketVerification {
    pub is_signature_valid: bool,
}

#[derive(CandidType, Serialize, Debug)]
pub struct PublicKeyReply {
    pub public_key_hex: String,
}

#[ic_cdk::update]
async fn public_key() -> Result<PublicKeyReply, ErrorUser> {
    let request = EcdsaPublicKeyArgument {
        canister_id: None,
        derivation_path: vec![],
        key_id: EcdsaKeyIds::TestKeyLocalDevelopment.to_key_id(),
    };

    let (response,) = ecdsa_public_key(request)
        .await
        .map_err(|e| (ErrorUser::SignWithEcdsaFailed(format!("ECDSA error: {}",e.1))))?;

    Ok(PublicKeyReply {
        public_key_hex: hex::encode(response.public_key),
    })
}


pub async fn generate_ticket_signature(ticket: Ticket) -> Result<TicketSignature, ErrorUser> {
    let ticket_data = format!(
        "{}:{}:{}",
        ticket.event_id, ticket.user, ticket.event_name
    );

    let message_hash = sha256(&ticket_data).to_vec();

    let request = SignWithEcdsaArgument {
        message_hash,
        derivation_path: vec![],
        key_id: EcdsaKeyIds::TestKeyLocalDevelopment.to_key_id(),
    };

    let (response,) = sign_with_ecdsa(request)
        .await
        .map_err(|e| (ErrorUser::SignWithEcdsaFailed(format!("ECDSA error: {}",e.1))))?;

    Ok(TicketSignature {
        signature_hex: hex::encode(response.signature),
    })
}


pub async fn verify_ticket_signature(
    signature_hex: String,
    ticket: Ticket,
) -> Result<TicketVerification, ErrorUser> {
    let ticket_data = format!(
        "{}:{}:{}",
        ticket.event_id, ticket.user, ticket.event_name
    );
    let message_bytes = ticket_data.as_bytes();

    let signature_bytes = hex::decode(signature_hex.clone()).expect("failed to hex-decode signature");

    use k256::ecdsa::signature::Verifier;
    let signature = k256::ecdsa::Signature::try_from(signature_bytes.as_slice())
        .expect("failed to deserialize signature");

    let public_key_hex = public_key().await?.public_key_hex; // Call to get the public key
    let pubkey_bytes = hex::decode(public_key_hex).expect("failed to hex-decode public key");

    let is_signature_valid = k256::ecdsa::VerifyingKey::from_sec1_bytes(&pubkey_bytes)
        .expect("failed to deserialize sec1 encoding into public key")
        .verify(message_bytes, &signature)
        .is_ok();

    if(event_repository::is_ticket_used(ticket.event_id.clone(), signature_hex.clone()) == false){
        return Err(ErrorUser::TicketAlreadyUsed);
        //"Ticket is already used"
    }

    event_repository::add_used_ticket(ticket.event_id.clone(), signature_hex);

    Ok(TicketVerification { is_signature_valid })
}

fn sha256(input: &String) -> [u8; 32] {
    use sha2::Digest;
    let mut hasher = sha2::Sha256::new();
    hasher.update(input.as_bytes());
    hasher.finalize().into()
}

enum EcdsaKeyIds {
    #[allow(unused)]
    TestKeyLocalDevelopment,
    #[allow(unused)]
    TestKey1,
    #[allow(unused)]
    ProductionKey1,
}

impl EcdsaKeyIds {
    fn to_key_id(&self) -> EcdsaKeyId {
        EcdsaKeyId {
            curve: EcdsaCurve::Secp256k1,
            name: match self {
                Self::TestKeyLocalDevelopment => "dfx_test_key",
                Self::TestKey1 => "test_key_1",
                Self::ProductionKey1 => "key_1",
            }
            .to_string(),
        }
    }
}

getrandom::register_custom_getrandom!(always_fail);
pub fn always_fail(_buf: &mut [u8]) -> Result<(), getrandom::Error> {
    Err(getrandom::Error::UNSUPPORTED)
}
