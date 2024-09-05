use std::collections::HashMap;
use std::collections::HashSet;

use crate::dto_request;
use crate::dto_response;
use crate::model::event_model::Event;
use crate::repository::event_repository;
use crate::repository::event_id_repository;
use crate::repository::user_repository;
use crate::service::query::user_service_query;
use candid::Principal;
use crate::TAGS;
use crate::Tag;

//1 Create event
use std::error::Error;

pub fn create_event(event_dto: dto_request::event_dto_request::EventDTO, caller: Principal) -> Result<(), Box<dyn Error>> {
    
    let event_id = event_id_repository::generate_event_id();

    //Create from for event TODO
    let event = Event::new(
        event_id,
        event_dto.name,
        event_dto.location,
        event_dto.address,
        event_dto.time_start,
        event_dto.time_end,
        event_dto.price,
        vec![caller],
        HashMap::new(),
        HashMap::new(),
        event_dto.tags.into_iter().collect::<HashSet<_>>(),
        event_dto.description,
        event_dto.email,
        event_dto.phone,
        event_dto.media,
        event_dto.thumbnail
    )?;
    add_event_to_tags(event.id().clone(),event.tags().clone());
    register_blank_user(caller);
    user_repository::add_hosting_event_to_user(caller, event_id);
    Ok(event_repository::create_event(event, event_id))

    // event_repository::create_event(event, event_id.clone());
    // Ok(user_repository::add_hosting_event_to_user(caller, event_id))
}

pub fn add_event_to_tags(event_id: u128, tags: HashSet<String>) {
    TAGS.with(|tags_ref_cell| {
        let mut tags_map = tags_ref_cell.borrow_mut();

        for tag_name in tags {
            if let Some(tag) = tags_map.get_mut(&tag_name) {
                tag.add_event(event_id);
            } else {
                tags_map.insert(tag_name.clone(), Tag::new(tag_name.clone()).expect("Failed to create new tag")); 
            }
        }
    });
}

//1 Join event
// pub fn join_event(caller: Principal, event_id: u128) -> Result<(), String> {
//     match event_repository::add_user_to_event(event_id, caller){
//         Ok(_) =>  user_repository::add_event_to_user(caller, event_id).map_err(|_| "Error message".to_string()),
//         Err(_) => Err("Error message".to_string()),
//     }
// }

// join event old - new doesnt work
use crate::EVENTS;
use crate::UserDataModel;
use crate::USER_DATA_MODEL;

pub fn register_blank_user(user: Principal) -> bool {
    let user_dto = dto_request::user_dto_request::UserDTO {
        name: "".to_string(),
        location: (0.0, 0.0),
        tags: HashSet::new(),
        job: "".to_string(),
        role: "".to_string(),
        bio: "".to_string(),
    };
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

pub fn join_event(caller: Principal, event_id: u128) -> bool {
    let mut event_joined = false;

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        
        if let Some(event) = events_map.get_mut(&event_id) {
            let host = event.list_of_admin().first();
            if let Some(host) = host {
                if host.to_string() == caller.to_string() {
                    return; // Host cannot join their own event
                }
            }
            
            if let Some(declaration) = event.hash_map_of_declared().get(&caller) {
                if declaration == "declared" {
                    return; // User has already declared
                }
            }

            event.add_participant(caller);
            event_joined = true;
        }
    });

    if event_joined {
        register_blank_user(caller);
        
        USER_DATA_MODEL.with(|users| {
            let mut users_map = users.borrow_mut();
            if let Some(user) = users_map.get_mut(&caller) {
                user.add_event(event_id);
                true
            } else {
                false
            }
        })
    } else {
        false
    }
}