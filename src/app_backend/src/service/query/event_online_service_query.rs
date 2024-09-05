use std::collections::HashMap;

use crate::dto_response::event_online_dto_response::{ EventOnlineDetailsResponse}; //TODO
use crate::EventOnline;
use crate::repository::{event_online_repository, event_repository, user_repository, tag_repository};
use candid::Principal;

//Get Event:

pub fn get_online_event(event_id: u128) -> Option<EventOnlineDetailsResponse> {
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

pub fn get_online_events_by_users_tags(caller: Principal) -> Option<Vec<EventOnlineDetailsResponse>>{
    let user_tags = user_repository::get_user(caller).map_or(Vec::new(), |user| user.get_tags().iter().cloned().collect() );

    let events_id = tag_repository::get_online_events_id_by_tags(user_tags);

    let events = event_online_repository::get_online_events(events_id);

    if events.is_empty() {
        None
    } else {
        let event_online_response: Vec<EventOnlineDetailsResponse> = events
            .iter()
            .map(EventOnlineDetailsResponse::from)
            .collect();
        Some(event_online_response)
    }
}