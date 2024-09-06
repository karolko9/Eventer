use std::collections::HashMap;
use std::collections::HashSet;
use std::f32::consts::E;

use crate::dto_request;
use crate::dto_response;
use crate::model::event_model::Event;
use crate::repository::event_id_repository;
use crate::repository::event_repository;
use crate::repository::user_repository;
use crate::service::query::user_service_query;
use crate::ticket;
use crate::ticket::ticket::TicketSignature;
use candid::Principal;

//1 Create event
use std::error::Error;

pub fn create_event(
    event_dto: dto_request::event_dto_request::EventDTO,
    caller: Principal,
) -> Result<(), Box<dyn Error>> {
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
        event_dto.thumbnail,
        HashSet::new(),
    )?;

    // todo: check if user exists
    register_blank_user(caller);
    user_repository::add_hosting_event_to_user(caller, event_id);
    Ok(event_repository::create_event(event, event_id))

    // event_repository::create_event(event, event_id.clone());
    // Ok(user_repository::add_hosting_event_to_user(caller, event_id))
}

//1 Join event
// pub fn join_event(caller: Principal, event_id: u128) -> Result<(), String> {
//     match event_repository::add_user_to_event(event_id, caller){
//         Ok(_) =>  user_repository::add_event_to_user(caller, event_id).map_err(|_| "Error message".to_string()),
//         Err(_) => Err("Error message".to_string()),
//     }
// }

// join event old - new doesnt work
use crate::UserDataModel;
use crate::EVENTS;
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



pub async fn join_event(caller: Principal, event_id: u128) -> Result<TicketSignature, String> {
    let mut event_joined = false;

    let mut event_name = String::new();

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

            event.add_participant(caller.clone());
            event_joined = true;
            event_name = event.name().clone().to_owned();
        }
    });



    if event_joined {

        // TODO payment


        if user_repository::user_exists(caller) == false {
            register_blank_user(caller);
        }


        USER_DATA_MODEL.with(|users| {
            let mut users_map = users.borrow_mut();
            let user = users_map.get_mut(&caller).unwrap();
            user.add_event(event_id);
        });



        
    } else {
        return Err("Event not found".to_string());
    }
    let ticket_gen: ticket::ticket::Ticket = ticket::ticket::Ticket::new(event_id, caller.to_string(), event_name.to_string());
    Ok(ticket::ticket::generate_ticket_signature(ticket_gen).await?)
}
