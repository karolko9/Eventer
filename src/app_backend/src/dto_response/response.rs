use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Serialize, Deserialize)]
pub struct EventResponse {
    pub location: (f64, f64),
    pub id: u128,
}