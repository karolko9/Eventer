use std::collections::HashSet;

use crate::{dto_response::event_dto_response::EventDetailsResponse, EVENTS};

pub fn get_events_with_details(events_id: HashSet<u128>) -> Option<Vec<EventDetailsResponse>> {
    let mut event_details_list = Vec::new();

    for event_id in events_id {
        if let Some(event) = EVENTS.with(|events| events.borrow().get(&event_id).cloned()) {
            let event_details_response = EventDetailsResponse::from(&event);
            event_details_list.push(event_details_response);
        }
    }

    if event_details_list.is_empty() {
        None
    } else {
        Some(event_details_list)
    }
}