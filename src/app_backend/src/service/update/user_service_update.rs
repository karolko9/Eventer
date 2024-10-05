use candid::Principal;
use crate::dto_request;
use crate::error::user_error::ErrorUser;
use crate::repository::user_repository;


//1 Register user or update if exist
pub fn register_user(user: Principal, user_dto: dto_request::user_dto_request::UserDTO) -> Result<bool, ErrorUser> {
    match user_repository::update_user_database(user, user_dto){
        Ok(_) => Ok(true),
        Err(e) => Err(e),
    }
}