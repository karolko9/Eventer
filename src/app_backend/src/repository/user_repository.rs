use std::collections::HashSet;

use candid::Principal;

use crate::dto_request::user_dto_request;
use crate::model::event_model::Event;
use crate::model::user_model::UserDataModel;
use crate::USER_DATA_MODEL;


pub fn user_exists(user: Principal) -> bool {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        user_data.contains_key(&user)
    })
}

pub fn get_user(user: Principal) -> Option<UserDataModel> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        let user_data_model = user_data.get(&user).cloned();
        user_data_model
    })
}

pub fn get_user_events(caller: Principal) -> HashSet<u128> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        if let Some(user) = user_data.get(&caller) {
            user.get_events().clone()
        } else {
            HashSet::<u128>::new()
        }
    })
}

pub fn get_user_hosted_events(caller: Principal) -> HashSet<u128> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        if let Some(user) = user_data.get(&caller) {
            user.get_hosted_events().clone()
        } else {
            HashSet::<u128>::new()
        }
    })
}

pub fn add_event_to_user(caller: Principal, event_id: u128) -> Result<(), ()> {

    USER_DATA_MODEL.with(|users| {
        let mut users_map = users.borrow_mut();
        if let Some(user) = users_map.get_mut(&caller) {
            user.add_event(event_id);
            Ok(())
        } else {
            Err(())
        }
    })
}

pub fn add_hosting_event_to_user(caller: Principal, event_id: u128) -> Result<(), ()> {

    USER_DATA_MODEL.with(|users| {
        let mut users_map = users.borrow_mut();
        if let Some(user) = users_map.get_mut(&caller) {
            user.add_hosted_event(event_id);
            Ok(())
        } else {
            Err(())
        }
    })
}

pub fn update_user_database(user: Principal, user_dto: user_dto_request::UserDTO) -> Result<(), ()> {
    
        USER_DATA_MODEL.with(|user_data_model| {
            let mut user_data_map = user_data_model.borrow_mut();
            
            if let Some(existing_user_data) = user_data_map.get_mut(&user) {
                existing_user_data.set_name(user_dto.name);
                if let Err(_) = existing_user_data.set_location(user_dto.location.0, user_dto.location.1) {
                    return Err(());
                }
                existing_user_data.set_tags(user_dto.tags);
                existing_user_data.set_job(user_dto.job);
                existing_user_data.set_role(user_dto.role);
                existing_user_data.set_bio(user_dto.bio);
            } else {
                let user_data = match UserDataModel::new(user_dto) {
                    Ok(data) => data,
                    Err(_) => return Err(()),
                };
                user_data_map.insert(user, user_data);
                // USER_DATA_MODEL.with(|user_data_model| {
                //     let mut user_data_map = user_data_model.borrow_mut();
                //     user_data_map.insert(user, user_data);
                // });
            }
            Ok(())
        })
}