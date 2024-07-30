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
    static NEXT_EVENT_ID: RefCell<u128> = RefCell::new(0);
}

type UserDataModels = HashMap<Principal, UserDataModel>;
type EventMap = HashMap<u128, Event>;




// USER
//
//
// GET USER
#[ic_cdk::query]
fn get_user() -> Option<UserDataModel> {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to get user.");
    // }
    service::user::get_user(ic_cdk::caller()) 
}

// REGISTER USER
#[ic_cdk::update]
fn register_user(user_dto: dto_request::request::UserDTO) -> bool {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to register user.");
    // }
    service::user::register_user(ic_cdk::caller(), user_dto)
}

// UPDATE USER
#[ic_cdk::update]
fn update_user(user_dto: dto_request::request::UserDTO) -> bool {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to update user.");
    // }
    service::user::update_user(ic_cdk::caller(), user_dto)
}

// EVENT
//
//
// CREATE EVENT
#[ic_cdk::update]
fn create_event(event_dto: dto_request::request::EventDTO) -> bool {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to create event.");
    // }
    service::event::create_event(event_dto, ic_cdk::caller())
}

// GET EVENT BY ID
#[ic_cdk::query]
fn get_event(event_id: u128) -> Option<dto_response::response::EventDetailsResponse> {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to get event.");
    // }
    service::event::get_event(event_id) 
}

// GET EVENTS BY TAGS
#[ic_cdk::query]
fn get_event_by_tags(tags: Vec<String>) -> Vec<dto_response::response::EventResponse> {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to get events.");
    // }
    service::event::get_event_by_tag(tags)
}

// GET EVENTS BY TAGS USER
#[ic_cdk::query]
fn get_event_by_tags_user() -> Vec<dto_response::response::EventResponse> {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to get events.");
    // }
    service::event::get_event_by_tag_user(ic_cdk::caller())           
}

//
// USER JOIN EVENT
// 

#[ic_cdk::update]
fn join_event(event_id: u128) -> bool {
    // if ic_cdk::caller() == Principal::anonymous() {
    //     ic_cdk::trap("Anonymous callers are not allowed to join event.");
    // }
    service::event::join_event(ic_cdk::caller(), event_id)
}

ic_cdk::export_candid!();
