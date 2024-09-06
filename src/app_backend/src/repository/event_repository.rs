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

pub fn get_events(events_ids: HashSet<u128>) -> Vec<Event> {
    let mut event_list = Vec::new();

    for event_id in events_ids {
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

pub fn get_all_events() -> Option<Vec<Event>>{
    EVENTS.with(|events| {
        let events = events.borrow();
        let mut all_events = Vec::new();

        for event_list in events.values() {
            all_events.push(event_list.clone());
        }

        if all_events.is_empty() {
            None
        } else {
            Some(all_events)
        }
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

pub fn is_user_admin(caller: Principal, event_id: u128) -> bool {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        if let Some(event) = events_map.get(&event_id) {
            event.list_of_admin().contains(&caller)
        } else {
            false
        }
    })
}

pub fn add_used_ticket(event_id: u128, signature_hex: String) {
    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        if let Some(event) = events_map.get_mut(&event_id) {
            event.add_used_ticket(signature_hex);
        }
    });
}

pub fn is_ticket_used(event_id: u128, signature_hex: String) -> bool {
    EVENTS.with(|events| {
        let events_map = events.borrow();
        if let Some(event) = events_map.get(&event_id) {
            event.used_tickets().contains(&signature_hex)
        } else {
            false
        }
    })
}