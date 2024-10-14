use candid::Principal;
use crate::error::event_online_error::ErrorEventOnline;
use crate::model::event_online_model::EventOnline;
use crate::EVENT_ONLINE;
use std::collections::HashSet;
use crate::repository;
use crate::dto_response::event_online_dto_response::EventOnlineDetailsResponse;
use crate::USER_DATA_MODEL;

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

pub fn add_user_to_online_event(event_id: u128, caller: Principal) -> Result<(), ErrorEventOnline> {
    EVENT_ONLINE.with(|events| {
        let mut events_map = events.borrow_mut();
        if let Some(event) = events_map.get_mut(&event_id) {
            event.add_participant(caller);
            Ok(())
        } else {
            Err(ErrorEventOnline::EventOnlineNotFound)
        }
    })
}

pub fn filter_unseen_events(user: Principal, event_ids: HashSet<u128>) -> HashSet<u128> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data_map = user_data_model.borrow();
        if let Some(user_data) = user_data_map.get(&user) {
            event_ids
                .into_iter()
                .filter(|event_id| !user_data.get_seen_events().contains(event_id))
                .collect()
        } else {
            event_ids
        }
    })
}

pub fn get_recommended_events_online_for_user(caller: Principal) -> Option<Vec<EventOnlineDetailsResponse>> {
    let user_tags = repository::user_repository::get_user(caller)
        .map_or(Vec::new(), |user| user.get_tags().iter().cloned().collect());

    /*let user_tags = repository::user_repository::get_user(caller)
    .map_or_else(
        || HashSet::new(), // Return an empty HashSet if user is not found
        |user| user.get_tags().iter().cloned().collect()
    );*/

    let events_id = repository::tag_repository::get_events_id_by_tags(user_tags);

    let unseen_event_ids = filter_unseen_events(caller, events_id);

    let events = repository::event_online_repository::get_online_events(unseen_event_ids);

    if events.is_empty() {
        None
    } else {
        let event_map_response: Vec<EventOnlineDetailsResponse> = events
            .iter()
            .map(EventOnlineDetailsResponse::from)
            .collect();
        Some(event_map_response)
    }
}

pub fn get_paginated_recommended_events_online(
    recommended_events: Option<Vec<EventOnlineDetailsResponse>>, 
    page: usize,
    user: Principal,
) -> Option<Vec<EventOnlineDetailsResponse>> {
    const EVENTS_PER_PAGE: usize = 20;
    
    if let Some(events) = recommended_events {
        let start = page * EVENTS_PER_PAGE;

        let paginated_events: Vec<EventOnlineDetailsResponse> = events
            .iter()
            .skip(start)
            .take(EVENTS_PER_PAGE)
            .cloned()
            .collect();

        for event in &paginated_events {
              repository::user_repository::mark_event_as_seen(user,event.id);
        }

        Some(paginated_events)
    } else {
        None
    }
}