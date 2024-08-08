use candid::Principal;

use crate::dto_request;
use crate::dto_response;
use crate::model::user_model::UserDataModel;
// use crate::service::query::user_repository_query::user_exists;
use crate::repository::user_repository;
use crate::USER_DATA_MODEL;


//1 Register user
pub fn register_user(user: Principal, user_dto: dto_request::user_dto_request::UserDTO) -> bool {
    if user_repository::user_exists(user) {
        false
    } else {
        let user_data = match UserDataModel::new(user_dto) {
            Ok(data) => data,
            Err(_) => return false,
        };

        USER_DATA_MODEL.with(|user_data_model| {
            let mut user_data_map = user_data_model.borrow_mut();
            user_data_map.insert(user, user_data);
        });
        true
    }
}

//1 Update user
pub fn update_user(user: Principal, user_dto: dto_request::user_dto_request::UserDTO) -> bool{
    USER_DATA_MODEL.with(|user_data_model| {
        let mut user_data_map = user_data_model.borrow_mut();
        
        if let Some(existing_user_data) = user_data_map.get_mut(&user) {
            existing_user_data.set_name(user_dto.name);
            if let Err(_) = existing_user_data.set_location(user_dto.location.0, user_dto.location.1) {
                return false;
            }
            existing_user_data.set_tags(user_dto.tags);
            existing_user_data.set_job(user_dto.job);
            existing_user_data.set_role(user_dto.role);
            existing_user_data.set_bio(user_dto.bio);
            true
        } else {
            false
        }
    })
}