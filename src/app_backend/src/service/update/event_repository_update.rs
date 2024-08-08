use std::collections::HashMap;

use crate::dto_request;
use crate::dto_response;
use crate::model::event_model::Event;
use crate::service::query::user_repository_query;
use crate::{ USER_DATA_MODEL, EVENTS, NEXT_EVENT_ID};
use candid::Principal;

//1 Create event
pub fn create_event(event_dto: dto_request::event_dto_request::EventDTO, caller: Principal) -> bool {
    
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
//1 Join event
pub fn join_event(caller: Principal, event_id: u128) -> bool {
    let mut event_joined = false;

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        if let Some(event) = events_map.get_mut(&event_id) {
            event.add_participant(caller);
            event_joined = true;
        }
    });

    if event_joined {
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
