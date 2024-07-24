use candid::Principal;
use std::{cell::RefCell, collections::HashMap};
mod model;
use model::{event::Event, user::UserDataModel};
mod service;

thread_local! {
    static USER_DATA_MODEL: std::cell::RefCell<UserDataModels> = RefCell::default();
    static EVENTS: std::cell::RefCell<EventMap> = RefCell::default();
}

type UserDataModels = HashMap<Principal, UserDataModel>;
type EventMap = HashMap<u128, Event>;

#[ic_cdk::query]
fn get_user(user: Principal) -> String {
    match service::user::get_user(user) {
        Some(user_data) => format!("Found user: {:?}", user_data),
        None => format!("User not found"),
    }
}
#[ic_cdk::update]
fn register_user(name: String, location: (f64, f64), hobbies: Vec<String>, job: String, role: String, bio: String) -> String {
    let caller = ic_cdk::caller();
    match service::user::register_user(caller, name, location, hobbies, job, role, bio) {
        Ok(message) => message,
        Err(err) => err,
    }
}

ic_cdk::export_candid!();
