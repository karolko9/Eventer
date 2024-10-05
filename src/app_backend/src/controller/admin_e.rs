use candid::Principal;

use crate::{repository::{event_repository, tag_repository}, ticket::ticket::{verify_ticket_signature, Ticket}};

// TODO : payment

#[ic_cdk::update]
pub fn add_tag_to_event(caller: Principal, event_id: u128, tag: String) -> Result<(), String> {
    if event_repository::is_user_admin(caller, event_id) {
        tag_repository::add_tag_to_event(event_id, tag);
        Ok(())
    } else {
        Err("User is not an admin".to_string())
    }
}

#[ic_cdk::update]
pub async fn verify_ticket_signature_by_admin(
    admin: Principal,
    signature_hex: String,
    ticket: Ticket,
) -> Result<(), String> {
    if event_repository::is_user_admin(admin, ticket.event_id.clone()) {
        if(verify_ticket_signature(signature_hex, ticket).await.unwrap().is_signature_valid){
            
            
            return Ok(());

        }
        Ok(())
    }else {
        Err("User is not an admin".to_string())
    }
}
