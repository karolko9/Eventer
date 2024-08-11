use std::collections::HashSet;

use candid::Principal;

use crate::model::event_model::Event;
use crate::EVENTS;

pub fn create_event(new_event: Event, event_id: u128) {
    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        events_map.insert(event_id, new_event);
    });
}

pub fn get_events(events_id: HashSet<u128>) -> Vec<Event> {
    let mut event_list = Vec::new();

    for event_id in events_id {
        if let Some(event) = EVENTS.with(|events| events.borrow().get(&event_id).cloned()) {
            event_list.push(event);
        }
    }
    event_list
}

pub fn get_event_by_id(event_id: u128) -> Option<Event> {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        events_map.get(&event_id).cloned()
    })
}

pub fn add_user_to_event(event_id: u128, caller: Principal) -> Result<(), String> {
    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        if let Some(event) = events_map.get_mut(&event_id) {
            event.add_participant(caller);
            Ok(())
        } else {
            Err("Event not found".to_string())
        }
    })
}