use crate::dto_request;
use crate::dto_response;

use crate::service; 

//CREATE EVENT ONLINE
#[ic_cdk::update]
fn create_event_online(event_online_dto: dto_request::event_online_dto_request::EventOnlineDTO) -> bool{
    match service::update::event_online_service_update::create_event_online(event_online_dto, ic_cdk::caller()) {
        Ok(_) => true,
        Err(_) => false,
    }
}

//GET EVENT BY ID
#[ic_cdk::query]
fn get_event_online(event_id: u128) -> Option<dto_response::event_online_dto_response::EventOnlineDetailsResponse> {
    service::query::event_online_service_query::get_online_event(event_id) 
}

#[ic_cdk::query]
fn get_online_events_by_users_tags() -> Option<Vec<dto_response::event_online_dto_response::EventOnlineDetailsResponse>> {
    service::query::event_online_service_query::get_online_events_by_users_tags(ic_cdk::caller())           
}

#[ic_cdk::query]
fn get_all_online_events() -> Option<Vec<dto_response::event_online_dto_response::EventOnlineDetailsResponse>>{
    service::query::event_online_service_query::get_all_online_events()
}