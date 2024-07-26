use candid::Principal;

use crate::model::user::UserDataModel;
use crate::USER_DATA_MODEL;

use crate::dto_request;


// Get user data
pub fn get_user(user: Principal) -> Option<UserDataModel> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        let user_data_model = user_data.get(&user).cloned();
        user_data_model
    })
}

// Check if user exists
pub fn user_exists(user: Principal) -> bool {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        user_data.contains_key(&user)
    })
}

// 
pub fn register_user(user: Principal, user_dto: dto_request::request::UserDTO) -> Result<String, String> {
    if user_exists(user) {
        Err("User already exists".to_string())
    } else {
        let user_data = UserDataModel::new(user_dto)
            .map_err(|e| e.to_string())?;

        USER_DATA_MODEL.with(|user_data_model| {
            let mut user_data_map = user_data_model.borrow_mut();
            user_data_map.insert(user, user_data);
        });
        Ok("User registered".to_string())
    }
}

pub fn update_user(user: Principal, user_dto: dto_request::request::UserDTO) -> Result<String, String> {
    USER_DATA_MODEL.with(|user_data_model| {
        let mut user_data_map = user_data_model.borrow_mut();
        
        if let Some(existing_user_data) = user_data_map.get_mut(&user) {
            existing_user_data.set_name(user_dto.name);
            if let Err(e) = existing_user_data.set_location(user_dto.location.0, user_dto.location.1) {
                return Err(e);
            }
            existing_user_data.set_tags(user_dto.tags);
            existing_user_data.set_job(user_dto.job);
            existing_user_data.set_role(user_dto.role);
            existing_user_data.set_bio(user_dto.bio);
            Ok("User updated".to_string())
        } else {
            Err("User does not exist".to_string())
        }
    })
}