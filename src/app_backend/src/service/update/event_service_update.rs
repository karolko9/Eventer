use std::collections::HashMap;
use std::collections::HashSet;

use crate::dto_request;
use crate::dto_response;
use crate::model::event_model::Event;
use crate::repository::event_repository;
use crate::repository::event_id_repository;
use crate::repository::user_repository;
use crate::service::query::user_service_query;
use candid::Principal;

//1 Create event
use std::error::Error;

pub fn create_event(event_dto: dto_request::event_dto_request::EventDTO, caller: Principal) -> Result<(), Box<dyn Error>> {
    
    let event_id = event_id_repository::generate_event_id();

    //Create from for event TODO
    let event = Event::new(
        event_id,
        event_dto.name,
        event_dto.location,
        event_dto.address,
        event_dto.time_start,
        event_dto.time_end,
        vec![caller],
        HashMap::new(),
        HashMap::new(),
        event_dto.tags.into_iter().collect::<HashSet<_>>()
    );

    Ok(event_repository::create_event(event, event_id))
}

//1 Join event
pub fn join_event(caller: Principal, event_id: u128) -> Result<(), String> {
    match event_repository::add_user_to_event(event_id, caller){
        Ok(_) =>  user_repository::add_event_to_user(caller, event_id).map_err(|_| "Error message".to_string()),
        Err(_) => Err("Error message".to_string()),
    }
}
