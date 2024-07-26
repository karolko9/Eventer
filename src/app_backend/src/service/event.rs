use std::collections::HashMap;

use candid::Principal;
use crate::model::event::Event;
use crate::{EVENTS, NEXT_EVENT_ID};
use crate::service::user;

pub fn create_event(
    name: String,
    time_start: String,
    time_end: String,
    creator: Principal,
    tags: Vec<String>
) -> Result<String, String> {
    let event_id = NEXT_EVENT_ID.with(|next_id| {
        let mut id_counter = next_id.borrow_mut();
        let current_id = *id_counter;
        *id_counter += 1; // Increment ID for next event
        current_id
    });

    let event = Event::new(
        event_id,
        name,
        time_start,
        time_end,
        vec![creator],
        HashMap::new(),
        HashMap::new(),
        tags
    );

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        events_map.insert(event_id, event);
    });

    Ok("Event created successfully".to_string())
}

pub fn get_event(event_id: u128) -> Option<Event> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map.get(&event_id).cloned()
    })
}

pub fn get_event_by_tag(tags: Vec<String>) -> Vec<((f64, f64), u128)> {
    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map.values()
            .filter(|event| tags.iter().all(|tag| event.tags().contains(tag)))
            .map(|event| ((event.location().0, event.location().1), event.id()))
            .collect()
    })
}

pub fn get_event_by_tag_user(caller: Principal) -> Vec<((f64, f64), u128)> {
    let user_tags = user::get_user(caller).map_or(Vec::new(), |user| user.get_tags().clone());

    EVENTS.with(|events| {
        let events_on_map = events.borrow();
        events_on_map.values()
            .filter(|event| user_tags.iter().any(|tag| event.tags().contains(tag)))
            .map(|event| (event.location(), event.id()))
            .collect()
    })
}