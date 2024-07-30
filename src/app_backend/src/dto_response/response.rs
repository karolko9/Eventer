use serde::{Deserialize, Serialize};
use candid::CandidType;

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
    pub id: u128,
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
}