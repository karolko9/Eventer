use serde::{Deserialize, Serialize};
use candid::CandidType;

use crate::model::event_model::Event;

#[derive(CandidType, Serialize, Deserialize)]
pub struct EventResponse {
    pub location: (f64, f64),
    pub id: u128,
}

#[derive(CandidType, Serialize, Deserialize)]
pub struct EventUserResponse {
    pub location: (f64, f64),
    pub name: String,
    pub id: u128,
}


#[derive(CandidType, Serialize, Deserialize)]
pub struct EventDetailsResponse {
    pub location: (f64, f64),
    pub address: String,
    pub id: u128,
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
}

impl From<&Event> for EventDetailsResponse {
    fn from(event: &Event) -> Self {
        EventDetailsResponse {
            id: event.id(),
            name: event.name().to_string(),
            location: event.location(),
            address: event.address().to_string(),
            time_start: event.time_start().to_string(),
            time_end: event.time_end().to_string(),
            tags: event.tags().to_vec(),
        }
    }
}