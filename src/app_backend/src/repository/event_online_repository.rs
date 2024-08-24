use candid::Principal;
use crate::model::event_online_model::EventOnline;
use crate::EVENT_ONLINE;
use std::collections::HashSet;

pub fn create_online_event(new_event: EventOnline, event_id: u128) {
    EVENT_ONLINE.with(|events| {
        let mut events_map = events.borrow_mut();
        events_map.insert(event_id, new_event);
    });
}

pub fn get_online_events(events_id: HashSet<u128>) -> Vec<EventOnline> {
    let mut event_list = Vec::new();

    for event_id in events_id {
        if let Some(event) = EVENT_ONLINE.with(|events| events.borrow().get(&event_id).cloned()) {
            event_list.push(event);
        }
    }
    event_list
}

pub fn get_event_online_by_id(event_id: u128) -> Option<EventOnline> {
    EVENT_ONLINE.with(|events| {
        let events_map = events.borrow();
        events_map.get(&event_id).cloned()
    })
}

pub fn get_all_events_online() -> Option<Vec<EventOnline>>{
    EVENT_ONLINE.with(|events| {
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

pub fn add_user_to_online_event(event_id: u128, caller: Principal) -> Result<(), String> {
    EVENT_ONLINE.with(|events| {
        let mut events_map = events.borrow_mut();
        if let Some(event) = events_map.get_mut(&event_id) {
            event.add_participant(caller);
            Ok(())
        } else {
            Err("Event not found".to_string())
        }
    })
}