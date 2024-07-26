use candid::Principal;

use crate::model::user::UserDataModel;
use crate::USER_DATA_MODEL;

pub fn get_user(user: Principal) -> Option<UserDataModel> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        let user_data_model = user_data.get(&user).cloned();
        user_data_model
    })
}

pub fn get_user_tags(user: Principal) -> Option<Vec<String>> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        user_data.get(&user).map(|user_data_model| user_data_model.tags().clone())
    })
}

pub fn user_exists(user: Principal) -> bool {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        user_data.contains_key(&user)
    })
}

pub fn register_user(
    user: Principal,
    name: String,
    location: (f64, f64),
    tags: Vec<String>,
    job: String,
    role: String,
    bio: String,
) -> Result<String, String> {
    if user_exists(user) {
        Err("User already exists".to_string())
    } else {
        let user_data = UserDataModel::new(name, location, tags, job, role, bio)
            .map_err(|e| e.to_string())?;

        USER_DATA_MODEL.with(|user_data_model| {
            let mut user_data_map = user_data_model.borrow_mut();
            user_data_map.insert(user, user_data);
        });
        Ok("User registered".to_string())
    }
}

pub fn update_user(
    user: Principal,
    name: String,
    location: (f64, f64),
    tags: Vec<String>,
    job: String,
    role: String,
    bio: String,
) -> Result<String, String> {
    let user_data = UserDataModel::new(name, location, tags, job, role, bio)
        .map_err(|e| e.to_string())?;

    USER_DATA_MODEL.with(|user_data_model| {
        let mut user_data_map = user_data_model.borrow_mut();
        
        if user_data_map.contains_key(&user) {
            user_data_map.insert(user, user_data);
            Ok("User updated".to_string())
        } else {
            user_data_map.insert(user, user_data);
            Ok("User registered".to_string())
        }
    })
}
