use candid::Principal;

use std::{cell::RefCell, collections::HashMap};

mod model;
mod service;
use model::{event_model::Event, user_model::UserDataModel, tag_model::Tag};

mod dto_request;
mod dto_response;

pub mod repository;

thread_local! {
    static USER_DATA_MODEL: std::cell::RefCell<UserDataModels> = RefCell::default();
    static EVENTS: std::cell::RefCell<EventMap> = RefCell::default();
    static NEXT_EVENT_ID: RefCell<u128> = RefCell::new(0);
    static TAGS: std::cell::RefCell<TagMap> = RefCell::default();
}

type UserDataModels = HashMap<Principal, UserDataModel>;
type EventMap = HashMap<u128, Event>;
type TagMap = HashMap<String, Tag>;



// USER
//
//
// GET USER
#[ic_cdk::query]
fn get_user() -> Option<UserDataModel> {
    service::query::user_service_query::get_user(ic_cdk::caller()) 
}

// REGISTER USER
#[ic_cdk::update]
fn register_user(user_dto: dto_request::user_dto_request::UserDTO) -> bool {
    service::update::user_service_update::register_user(ic_cdk::caller(), user_dto)
}

// UPDATE USER
#[ic_cdk::update]
fn update_user(user_dto: dto_request::user_dto_request::UserDTO) -> bool {
    service::update::user_service_update::update_user(ic_cdk::caller(), user_dto)
}

#[ic_cdk::update]
fn get_user_events() -> Option<Vec<dto_response::event_dto_response::EventDetailsResponse>>{
    service::query::user_service_query::get_user_events(ic_cdk::caller())
}

// EVENT
//
//
// CREATE EVENT
#[ic_cdk::update]
fn create_event(event_dto: dto_request::event_dto_request::EventDTO) -> bool {
    match service::update::event_service_update::create_event(event_dto, ic_cdk::caller()) {
        Ok(_) => true,
        Err(_) => false,
    }}

// GET EVENT BY ID
#[ic_cdk::query]
fn get_event(event_id: u128) -> Option<dto_response::event_dto_response::EventDetailsResponse> {
    service::query::event_service_query::get_event(event_id) 
}

// GET EVENTS BY TAGS USER
#[ic_cdk::query]
fn get_event_by_tags_user() -> Option<Vec<dto_response::event_dto_response::EventMapResponse>> {
    service::query::event_service_query::get_event_by_tag_user(ic_cdk::caller())           
}

//
// USER JOIN EVENT
// 

#[ic_cdk::update]
fn join_event(event_id: u128) -> bool {
    service::update::event_service_update::join_event(ic_cdk::caller(), event_id)
}

ic_cdk::export_candid!();
