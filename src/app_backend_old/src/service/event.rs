use std::collections::HashMap;

use crate::dto_request;
use crate::dto_response::response::{EventResponse, EventDetailsResponse};
use crate::model::event::Event;
use crate::service::user;
use crate::{ USER_DATA_MODEL, EVENTS, NEXT_EVENT_ID};
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
        event_dto.location,
        event_dto.address,
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

pub fn get_event_by_tag_user(caller: Principal) -> Vec<EventResponse> {
    let user_tags = user::get_user(caller).map_or(Vec::new(), |user| user.get_tags().clone());

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
pub fn join_event(caller: Principal, event_id: u128) -> bool {
    let mut event_joined = false;

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        
        if let Some(event) = events_map.get_mut(&event_id) {
            let host = event.list_of_admin().first();
            if let Some(host) = host {
                if host.to_string() == caller.to_string() {
                    return; // Host cannot join their own event
                }
            }
            
            if let Some(declaration) = event.hash_map_of_declared().get(&caller) {
                if declaration == "declared" {
                    return; // User has already declared
                }
            }

            event.add_participant(caller);
            event_joined = true;
        }
    });

    if event_joined {
        user::register_blank_user(caller);
        
        USER_DATA_MODEL.with(|users| {
            let mut users_map = users.borrow_mut();
            if let Some(user) = users_map.get_mut(&caller) {
                user.add_event(event_id);
                true
            } else {
                false
            }
        })
    } else {
        false
    }
}



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