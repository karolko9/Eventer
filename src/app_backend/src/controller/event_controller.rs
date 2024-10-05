use crate::dto_request;
use crate::dto_response;
use crate::service; 
use std::collections::HashSet;

// use crate::error::event_error;

// CREATE EVENT 
//  Result<(), event_error::Error_event>
#[ic_cdk::update]
fn create_event(event_dto: dto_request::event_dto_request::EventDTO) -> Result<(),String>{
    match service::update::event_service_update::create_event(event_dto, ic_cdk::caller()) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Failed to create event: {:?}", e)),
    }
}

// GET EVENT BY ID
#[ic_cdk::query]
fn get_event(event_id: u128) -> Option<dto_response::event_dto_response::EventDetailsResponse> {
    service::query::event_service_query::get_event(event_id)
}

// GET EVENTS BY TAGS USER
#[ic_cdk::query]
fn get_event_by_tags_user() -> Option<Vec<dto_response::event_dto_response::EventMapResponse>> {
    service::query::event_service_query::get_event_by_tag_user(ic_cdk::caller())           
}

#[ic_cdk::query]
fn get_all_events() -> Option<Vec<dto_response::event_dto_response::EventMapResponse>>{
    service::query::event_service_query::get_all_events()
}

//RECOMENDATIONS
#[ic_cdk::update]
fn download_recommended_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>> {
    service::update::event_service_update::recommended_events(ic_cdk::caller(),0)
}