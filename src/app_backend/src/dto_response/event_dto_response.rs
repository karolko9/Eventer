use serde::{Deserialize, Serialize};
use candid::CandidType;
use crate::component;

use crate::model::event_model::Event;

#[derive(CandidType, Serialize, Deserialize)]
pub struct EventMapResponse {
    pub location: (f64, f64),
    pub id: u128,
    pub thumbnail: String
}

impl From<Event> for EventMapResponse {
    fn from(event: Event) -> Self {
        EventMapResponse{
            location: event.location(),
            id: event.id(),
            thumbnail: event.thumbnail()
        }
    }
}

#[derive(CandidType, Serialize, Deserialize)]
pub struct EventMapName {
    pub location: (f64, f64),
    pub name: String,
    pub id: u128,
}

impl From<Event> for EventMapName {
    fn from(event: Event)-> Self{
        EventMapName{
            location: event.location(),
            name: event.name().to_string(),
            id: event.id()
        }
    }
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
    pub price: f32,
    pub description: String,
    pub contact: component::contact::Contact,
    pub thumbnail: String
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
            tags: event.tags().iter().cloned().collect(),
            price: event.price(),
            description: event.description().to_string(),
            contact: event.contact(),
            thumbnail: event.thumbnail()
        }
    }
}