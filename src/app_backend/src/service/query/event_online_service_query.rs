use std::collections::HashMap;

use crate::dto_response::event_online_dto_response::{ EventOnlineDetailsResponse}; //TODO
use crate::EventOnline;
use crate::repository::{event_online_repository, event_repository, user_repository, tag_repository};
use candid::Principal;

//Get Event:

pub fn get_online_event(event_id: u128) -> Option<EventOnlineDetailsResponse> { //TODO WITH CONTROLLER
    event_online_repository::get_event_online_by_id(event_id)
        .as_ref()
        .map(EventOnlineDetailsResponse::from)
}

//GET ALL EVENTS:

pub fn get_all_online_events() -> Option<Vec<EventOnlineDetailsResponse>>{ //DTO TODO 
    event_online_repository::get_all_events_online().map(|events_vec| {
        events_vec.into_iter()
            .map(|event| EventOnlineDetailsResponse::from(&event))
            .collect()
    })
}


