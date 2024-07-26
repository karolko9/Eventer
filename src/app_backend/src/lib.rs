use candid::Principal;
use std::{cell::RefCell, collections::HashMap};
mod model;
use model::{event::Event, user::UserDataModel};
mod dto_request;
mod service;

thread_local! {
    static USER_DATA_MODEL: std::cell::RefCell<UserDataModels> = RefCell::default();
    static EVENTS: std::cell::RefCell<EventMap> = RefCell::default();
    static NEXT_EVENT_ID: RefCell<u128> = RefCell::new(1);
}

type UserDataModels = HashMap<Principal, UserDataModel>;
type EventMap = HashMap<u128, Event>;

// USER
//
//
// GET USER
#[ic_cdk::query]
fn get_user() -> String {
    let user = ic_cdk::caller();
    match service::user::get_user(user) {
        Some(user_data) => format!("Found user: {:?}", user_data),
        None => format!("User not found"),
    }
}

// REGISTER USER
#[ic_cdk::update]
fn register_user(user_dto: dto_request::request::UserDTO) -> String {
    let caller = ic_cdk::caller();
    match service::user::register_user(caller, user_dto) {
        Ok(message) => message,
        Err(err) => err,
    }
}

// UPDATE USER
#[ic_cdk::update]
fn update_user(user_dto: dto_request::request::UserDTO) -> String {
    let caller = ic_cdk::caller();
    match service::user::update_user(caller, user_dto) {
        Ok(message) => message,
        Err(err) => err,
    }
}

// EVENT
//
//
// CREATE EVENT
#[ic_cdk::update]
fn create_event(name: String, time_start: String, time_end: String, tags: Vec<String>) -> String {
    let creator = ic_cdk::caller();
    match service::event::create_event(name, time_start, time_end, creator, tags) {
        Ok(message) => message,
        Err(err) => err,
    }
}

// GET EVENT BY ID
#[ic_cdk::query]
fn get_event(event_id: u128) -> String {
    match service::event::get_event(event_id) {
        Some(event) => format!("Found event: {:?}", event),
        None => format!("Event not found"),
    }
}

// GET EVENTS BY TAGS
#[ic_cdk::query]
fn get_event_by_tags(tags: Vec<String>) -> Option<Vec<((f64, f64), u128)>> {
    let events = service::event::get_event_by_tag(tags);
    if events.is_empty() {
        None
    } else {
        Some(events)
    }
}

// GET EVENTS BY TAGS USER
#[ic_cdk::query]
fn get_event_by_tags_user() -> Option<Vec<((f64, f64), u128)>> {
    let caller = ic_cdk::caller();
    let events = service::event::get_event_by_tag_user(caller);
    if events.is_empty() {
        None
    } else {
        Some(events)
    }
}

ic_cdk::export_candid!();
