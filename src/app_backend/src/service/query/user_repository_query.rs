use candid::Principal;

use crate::dto_request::event_dto_request;
use crate::dto_request::user_dto_request;
use crate::dto_response::event_dto_response;
use crate::dto_response::user_dto_response;
use crate::model::user_model::UserDataModel;
use crate::USER_DATA_MODEL;

use crate::dto_request;

//1 Get user data 
pub fn get_user(user: Principal) -> Option<UserDataModel> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        let user_data_model = user_data.get(&user).cloned();
        user_data_model
    })
}

//1 User events
pub fn get_user_events(caller: Principal) -> Vec<event_dto_response::EventUserResponse> {
    USER_DATA_MODEL.with(|user_data_model| {
        let user_data = user_data_model.borrow();
        if let Some(user) = user_data.get(&caller) {
            let get_events = user.get_events();
            get_events
        } else {
            Vec::new()
        }
    })
}