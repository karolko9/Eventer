use candid::{CandidType, Deserialize};
use serde::Serialize;

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub enum ErrorEvent {
    EventNotFound,
    LatitudeIsIncorrect,
    LongitudeIsIncorrect,
    Error,
}