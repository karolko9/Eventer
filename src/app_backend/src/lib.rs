use candid::Principal;
use std::{cell::RefCell, collections::HashMap};
mod model;
use model::{event::Event, user::UserDataModel};
mod dto_request;
mod dto_response;
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
    match service::user::get_user(ic_cdk::caller()) {
        Some(user_data) => format!("Found user: {:?}", user_data),
        None => format!("User not found"),
    }
}

// REGISTER USER
#[ic_cdk::update]
fn register_user(user_dto: dto_request::request::UserDTO) -> String {
    match service::user::register_user(ic_cdk::caller(), user_dto) {
        Ok(message) => message,
        Err(err) => err,
    }
}

// UPDATE USER
#[ic_cdk::update]
fn update_user(user_dto: dto_request::request::UserDTO) -> String {
    match service::user::update_user(ic_cdk::caller(), user_dto) {
        Ok(message) => message,
        Err(err) => err,
    }
}

// EVENT
//
//
// CREATE EVENT
#[ic_cdk::update]
fn create_event(event_dto: dto_request::request::EventDTO) -> String {
    match service::event::create_event(event_dto, ic_cdk::caller()) {
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
fn get_event_by_tags(tags: Vec<String>) -> Vec<dto_response::response::EventResponse> {
    service::event::get_event_by_tag(tags)
}

// GET EVENTS BY TAGS USER
#[ic_cdk::query]
fn get_event_by_tags_user() -> Vec<dto_response::response::EventResponse> {
    service::event::get_event_by_tag_user(ic_cdk::caller())           
}

ic_cdk::export_candid!();
