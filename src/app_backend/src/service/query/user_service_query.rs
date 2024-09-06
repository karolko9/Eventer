use candid::Principal;

use crate::dto_response::event_dto_response;
use crate::dto_response::event_online_dto_response;
use crate::model::user_model::UserDataModel;
use crate::repository::event_repository;
use crate::repository::event_online_repository;
use crate::repository::user_repository;

//1 Get user data 
pub fn get_user(user: Principal) -> Option<UserDataModel> {
    user_repository::get_user(user)
}

//1 User events
pub fn get_user_events(caller: Principal) -> Option<Vec<event_dto_response::EventDetailsResponse>> {

    let user_events_ids = user_repository::get_user_events(caller);

    if user_events_ids.is_empty(){
        None
    } else {
        let events = event_repository::get_events(user_events_ids);
        let event_details: Vec<event_dto_response::EventDetailsResponse> = events
            .iter()
            .map(|event| event_dto_response::EventDetailsResponse::from(event))
            .collect();
        Some(event_details)
    }
}

//1 User hosted events
pub fn get_user_hosted_events(caller: Principal) -> Option<Vec<event_dto_response::EventDetailsResponse>> {

    let user_hosted_events_ids = user_repository::get_user_hosted_events(caller);

    if user_hosted_events_ids.is_empty(){
        None
    } else {
        let events = event_repository::get_events(user_hosted_events_ids);
        let event_details: Vec<event_dto_response::EventDetailsResponse> = events
            .iter()
            .map(|event| event_dto_response::EventDetailsResponse::from(event))
            .collect();
        Some(event_details)
    }
}

//EVENTS ONLINE:

pub fn get_user_events_online(caller: Principal) -> Option<Vec<event_online_dto_response::EventOnlineDetailsResponse>> {

    let user_events_ids = user_repository::get_user_events_online(caller);

    if user_events_ids.is_empty(){
        None
    } else {
        let events = event_online_repository::get_online_events(user_events_ids);
        let event_details: Vec<event_online_dto_response::EventOnlineDetailsResponse> = events
            .iter()
            .map(|event| event_online_dto_response::EventOnlineDetailsResponse::from(event))
            .collect();
        Some(event_details)
    }
}

pub fn get_user_hosted_events_online(caller: Principal) -> Option<Vec<event_online_dto_response::EventOnlineDetailsResponse>> {

    let user_hosted_events_ids = user_repository::get_user_hosted_events_online(caller);

    if user_hosted_events_ids.is_empty(){
        None
    } else {
        let events = event_online_repository::get_online_events(user_hosted_events_ids);
        let event_details: Vec<event_online_dto_response::EventOnlineDetailsResponse> = events
            .iter()
            .map(|event| event_online_dto_response::EventOnlineDetailsResponse::from(event))
            .collect();
        Some(event_details)
    }
}