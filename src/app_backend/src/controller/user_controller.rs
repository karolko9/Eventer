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

#[ic_cdk::update]
fn join_event_online(event_id: u128) -> bool {
    service::update::event_online_service_update::join_event_online(ic_cdk::caller(), event_id)
}

#[ic_cdk::query]
fn get_user_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>>{
    service::query::user_service_query::get_user_events(ic_cdk::caller())
}

#[ic_cdk::query]
fn get_user_events_online() -> Option<Vec<dto_response::event_online_dto_response::EventOnlineDetailsResponse>>{
    service::query::user_service_query::get_user_events_online(ic_cdk::caller())
}

#[ic_cdk::query]
fn get_user_hosted_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>>{
    service::query::user_service_query::get_user_hosted_events(ic_cdk::caller())
}

#[ic_cdk::query]
fn get_user_hosted_events_online() -> Option<Vec<dto_response::event_online_dto_response::EventOnlineDetailsResponse>>{
    service::query::user_service_query::get_user_hosted_events_online(ic_cdk::caller())
}