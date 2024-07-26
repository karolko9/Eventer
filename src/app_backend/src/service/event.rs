use std::collections::HashMap;

use crate::dto_request;
use crate::dto_response;
use crate::model::event::Event;
use crate::service::user;
use crate::{EVENTS, NEXT_EVENT_ID};
use candid::Principal;

pub fn create_event(event_dto: dto_request::request::EventDTO, caller: Principal) -> bool {
    let event_id = NEXT_EVENT_ID.with(|next_id| {
        let mut id_counter = next_id.borrow_mut();
        let current_id = *id_counter;
        *id_counter += 1; // Increment ID for next event
        current_id
    });

    let event = Event::new(
        event_id,
        event_dto.name,
        event_dto.time_start,
        event_dto.time_end,
        vec![caller],
        HashMap::new(),
        HashMap::new(),
        event_dto.tags,
    );

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        events_map.insert(event_id, event);
    });

    true
}

pub fn get_event(event_id: u128) -> Option<dto_response::response::EventDetailsResponse> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map.get(&event_id).map(|event| dto_response::response::EventDetailsResponse {
            location: (event.location().0.clone(), event.location().1.clone()),
            id: event.id().clone(),
            name: event.name().to_string(),
            time_start: event.time_start().to_string(),
            time_end: event.time_end().to_string(),
            tags: event.tags().clone(),
        })
    })
}

pub fn get_event_by_tag(tags: Vec<String>) -> Vec<dto_response::response::EventResponse> {
    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map
            .values()
            .filter(|event| tags.iter().all(|tag| event.tags().contains(tag)))
            .map(|event| dto_response::response::EventResponse {
                location: (event.location().0.clone(), event.location().1.clone()),
                id: event.id().clone(),
            })
            .collect()
    })
}

pub fn get_event_by_tag_user(caller: Principal) -> Vec<dto_response::response::EventResponse> {
    let user_tags = user::get_user(caller).map_or(Vec::new(), |user| user.get_tags().clone());

    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map
            .values()
            .filter(|event| user_tags.iter().any(|tag| event.tags().contains(tag)))
            .map(|event| dto_response::response::EventResponse {
                location: (event.location().0.clone(), event.location().1.clone()),
                id: event.id().clone(),
            })
            .collect()
    })
}
