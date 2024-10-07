use candid::{CandidType, Deserialize};
use serde::Serialize;
use std::fmt;

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub enum ErrorEvent {
    EventNotFound,
    LatitudeIsIncorrect,
    LongitudeIsIncorrect,
}

impl fmt::Display for ErrorEvent {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ErrorEvent::EventNotFound => write!(f, "Event not found"),
            ErrorEvent::LatitudeIsIncorrect => write!(f, "Latitude should be between -90 and 90"),
            ErrorEvent::LongitudeIsIncorrect => write!(f, "Longitude should be between -180 and 180"),
        }
    }
}