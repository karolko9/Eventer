use std::collections::HashMap;

use crate::dto_response::event_dto_response::{EventResponse, EventDetailsResponse};
use crate::model::event_model::Event;
use crate::service::query::user_repository_query;
use crate::{ USER_DATA_MODEL, EVENTS, NEXT_EVENT_ID};
use candid::Principal;

//1 Get event
pub fn get_event(event_id: u128) -> Option<EventDetailsResponse> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map.get(&event_id).map(|event| EventDetailsResponse {
            location: (event.location().0.clone(), event.location().1.clone()),
            address: event.address().to_string(),
            id: event.id().clone(),
            name: event.name().to_string(),
            time_start: event.time_start().to_string(),
            time_end: event.time_end().to_string(),
            tags: event.tags().clone(),
        })
    })
}
//1 to change
pub fn get_event_by_tag(tags: Vec<String>) -> Vec<EventResponse> {
    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map
            .values()
            .filter(|event| tags.iter().all(|tag| event.tags().contains(tag)))
            .map(|event| EventResponse {
                location: (event.location().0.clone(), event.location().1.clone()),
                id: event.id().clone(),
            })
            .collect()
    })
}
//1 even one tag is enough
pub fn get_event_by_tag_user(caller: Principal) -> Vec<EventResponse> {
    let user_tags = user_repository_query::get_user(caller).map_or(Vec::new(), |user| user.get_tags().clone());

    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map
            .values()
            .filter(|event| user_tags.iter().any(|tag| event.tags().contains(tag)))
            .map(|event| EventResponse {
                location: (event.location().0.clone(), event.location().1.clone()),
                id: event.id().clone(),
            })
            .collect()
    })
}

//1 Get all events
pub fn get_all_events_with_details() -> Vec<EventDetailsResponse> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map
            .values()
            .map(|event| EventDetailsResponse {
                location: (event.location().0.clone(), event.location().1.clone()),
                address: event.address().to_string(),
                id: event.id().clone(),
                name: event.name().to_string(),
                time_start: event.time_start().to_string(),
                time_end: event.time_end().to_string(),
                tags: event.tags().clone(),
            })
            .collect()
    })
}
// 1 get all events
pub fn get_all_events() -> Vec<EventResponse> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map
            .values()
            .map(|event| EventResponse {
                id: event.id().clone(),
                location: (event.location().0.clone(), event.location().1.clone()),
            })
            .collect()
    })
}