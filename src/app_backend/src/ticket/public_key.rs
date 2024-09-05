// use ic_cdk;
// use candid::CandidType;
// use serde::Serialize;

// #[derive(CandidType, Serialize, Debug)]
// pub struct PublicKeyReply {
//     pub public_key_hex: String,
// }

// [ic_cdk::init]
// let PublicKeyReply;

// #[ic_cdk::init]
// fn public_key() -> Result<PublicKeyReply, String> {
//     let request = EcdsaPublicKeyArgument {
//         canister_id: None,
//         derivation_path: vec![],
//         key_id: EcdsaKeyIds::TestKeyLocalDevelopment.to_key_id(),
//     };

//     let (response,) = ecdsa_public_key(request)
//         .await
//         .map_err(|e| format!("ecdsa_public_key failed {}", e.1))?;

//     Ok(PublicKeyReply {
//         public_key_hex: hex::encode(response.public_key),
//     })
// }