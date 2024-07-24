use std::collections::HashMap;

use candid::Principal;
use crate::model::event::Event;
use crate::{EVENTS, NEXT_EVENT_ID};

pub fn create_event(
    name: String,
    time_start: String,
    time_end: String,
    creator: Principal
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

