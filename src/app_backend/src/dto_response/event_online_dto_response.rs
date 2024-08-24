use serde::{Deserialize, Serialize};
use candid::CandidType;

use crate::model::event_online_model::EventOnline;


#[derive(CandidType, Serialize, Deserialize)]
pub struct EventOnlineDetailsResponse {
    pub url: String,
    pub id: u128,
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
}


impl From<&EventOnline> for EventOnlineDetailsResponse {
    fn from(event_online: &EventOnline) -> Self {
        EventOnlineDetailsResponse {
            id: event_online.id(),
            name: event_online.name().to_string(),
            url: event_online.url().to_string(),
            time_start: event_online.time_start().to_string(),
            time_end: event_online.time_end().to_string(),
            tags: event_online.tags().iter().cloned().collect(),
        }
    }
}