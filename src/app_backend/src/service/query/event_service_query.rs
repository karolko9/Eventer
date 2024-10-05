use crate::dto_response::event_dto_response::{ EventMapResponse, EventDetailsResponse};
use crate::repository::{event_repository, user_repository, tag_repository};
use crate::repository;
use candid::Principal;

//1 Get event
/*pub fn get_event(event_id: u128) -> Result<EventDetailsResponse,String> {
    match event_repository::get_event_by_id(event_id){
        Ok(event) => Ok(EventDetailsResponse::from(&event)),
        Err(e) => Err(e),
    }
}*/

pub fn get_event(event_id: u128) -> Option<EventDetailsResponse> {
    event_repository::get_event_by_id(event_id)
        .as_ref()
        .map(EventDetailsResponse::from)
}

//Ready:
//Get events that are corelated with tags
pub fn get_event_by_tag_user(caller: Principal) -> Option<Vec<EventMapResponse>> {
    let user_tags = user_repository::get_user(caller).map_or(Vec::new(), |user| user.get_tags().iter().cloned().collect());

    let events_id = tag_repository::get_events_id_by_tags(user_tags);    

    let events = event_repository::get_events(events_id);

    if events.is_empty() {
        None
    } else {
        let event_map_response: Vec<EventMapResponse> = events
            .into_iter()
            .map(EventMapResponse::from)
            .collect();
        Some(event_map_response)
    }
    //it returns a all events that has matching even one tag!
}


pub fn get_all_events() -> Option<Vec<EventMapResponse>>{
    event_repository::get_all_events().map(|events_vec| {
        events_vec.into_iter()
            .map(|event| EventMapResponse::from(event))
            .collect()
    })
}

pub fn is_user_admin(caller: Principal, event_id: u128) -> bool {
    event_repository::is_user_admin(caller, event_id)
}






























//      TO
// 
//      DELETE
//  
//      THIS 
// 
//      CRAP
// 
//      ASAP


// //1 Get all events
// pub fn get_all_events_with_details() -> Vec<EventDetailsResponse> {
//     EVENTS.with(|events| {
//         let events_map = events.borrow();
//         events_map
//             .values()
//             .map(|event| EventDetailsResponse {
//                 location: (event.location().0.clone(), event.location().1.clone()),
//                 address: event.address().to_string(),
//                 id: event.id().clone(),
//                 name: event.name().to_string(),
//                 time_start: event.time_start().to_string(),
//                 time_end: event.time_end().to_string(),
//                 tags: event.tags().clone(),
//             })
//             .collect()
//     })
// }
// // 1 get all events
// pub fn get_all_events() -> Vec<EventMapResponse> {
//     EVENTS.with(|events| {
//         let events_map = events.borrow();
//         events_map
//             .values()
//             .map(|event| EventMapResponse {
//                 id: event.id().clone(),
//                 location: (event.location().0.clone(), event.location().1.clone()),
//             })
//             .collect()
//     })
// }