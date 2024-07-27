
use std::{
    cell::RefCell,
    collections::HashMap,
};
use candid::Principal;
mod model;
use model::{event::Event, user::UserDataModel};


thread_local! {
    static USER_DATA_MODEL: std::cell::RefCell<UserDataModels> = RefCell::default();
    static EVENTS: std::cell::RefCell<HashMap<u128, Event>> = std::cell::RefCell::new(HashMap::new());
}

type UserDataModels = HashMap<Principal, UserDataModel>;


#[ic_cdk::query]
fn check_user_model() -> Result<bool, String> {
    let caller = ic_cdk::caller();
    
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        if user_data.contains_key(&caller) {
            Ok(true)
        } else {
            Err("not".to_string())
        }
    })
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    if let Ok(true) = check_user_model() {
        format!("Hello, {}! caller: {}", name, ic_cdk::caller())
    } else {
        format!("Naura, {}! caller: {}", name, ic_cdk::caller())
        
    }
    // format!("Hello, {}! caller: {}", name, ic_cdk::caller())
}

ic_cdk::export_candid!();