use std::collections::HashMap;
use std::collections::HashSet;

use crate::dto_request;
use crate::UserDataModel;
use crate::USER_DATA_MODEL;
use crate::EVENT_ONLINE;
use crate::dto_response;
use crate::EventOnline;
use crate::repository::event_online_repository;
use crate::repository::event_id_repository;
use crate::repository::user_repository;
use crate::service::query::user_service_query;
use candid::Principal;
use crate::ONLINE_TAGS;
use crate::Tag;

//CREATE ONLINE EVENT:

use std::error::Error;

pub fn create_event_online(event_dto: dto_request::event_online_dto_request::EventOnlineDTO, caller: Principal) -> Result<(), Box<dyn Error>> {
    
    let event_id = event_id_repository::generate_event_id();

    //Create from for event TODO
    let event = EventOnline::new(
        event_id,
        event_dto.name,
        event_dto.url,
        event_dto.time_start,
        event_dto.time_end,
        vec![caller],
        HashSet::new(),
        event_dto.tags.into_iter().collect::<HashSet<_>>(),
    );
    register_blank_user(caller);
    //add_event_to_online_tags(event.id().clone(), event.tags().clone());
    user_repository::add_hosting_event_to_user(caller, event_id);
    Ok(event_online_repository::create_online_event(event, event_id))
}
//dont know where it should be (for now lets say it can be here)

/*pub fn add_event_to_online_tags(event_id: u128, tags: HashSet<String>) {
    ONLINE_TAGS.with(|online_tags| {

        let mut tags_map = online_tags.borrow_mut();
        for tag_name in tags {
            if let Some(tag) = tags_map.get_mut(&tag_name) {
                tag.add_event(event_id);
            } else {
                tags_map.insert(tag_name.clone(), Tag::new(tag_name)); // Create new tag
            }
        }

    });
}*/

//if the tags are fixed we are not going to do this

//could be here or in the other place (???)
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

//JOINING EVENT ONLINE

pub fn join_event_online(caller: Principal, event_id: u128) -> bool {
    let mut event_joined = false;

    EVENT_ONLINE.with(|events| {
        let mut events_map = events.borrow_mut();
        
        if let Some(event) = events_map.get_mut(&event_id) {
            let host = event.list_of_admin().first();
            if let Some(host) = host {
                if host.to_string() == caller.to_string() {
                    return; // Host cannot join their own event
                }
            }
            
            if event.hash_map_of_declared().contains(&caller) {
                return; 
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