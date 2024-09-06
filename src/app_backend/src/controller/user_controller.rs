// use candid::Principal;


use crate::model::user_model::UserDataModel;
use crate::service; 

use crate::dto_request;
use crate::dto_response;
use crate::ticket::ticket::TicketSignature;

// use crate::error::user_error;

// GET USER
#[ic_cdk::query]
fn get_user() -> Option<UserDataModel> {
    service::query::user_service_query::get_user(ic_cdk::caller()) 
}

// REGISTER USER
#[ic_cdk::update]
fn register_user(user_dto: dto_request::user_dto_request::UserDTO) -> bool {
    service::update::user_service_update::register_user(ic_cdk::caller(), user_dto)
}

#[ic_cdk::update]
async fn join_event(event_id: u128) -> Result<TicketSignature, String> {
    // match service::update::event_service_update::join_event(ic_cdk::caller(), event_id){
    //     Ok(_) => true,
    //     Err(_) => false,
    // }
    service::update::event_service_update::join_event(ic_cdk::caller(), event_id).await
}

#[ic_cdk::query]
fn get_user_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>>{
    service::query::user_service_query::get_user_events(ic_cdk::caller())
}

#[ic_cdk::query]
fn get_user_hosted_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>>{
    service::query::user_service_query::get_user_hosted_events(ic_cdk::caller())
}
