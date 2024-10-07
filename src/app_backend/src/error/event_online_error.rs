use candid::{CandidType, Deserialize};
use serde::Serialize;
use std::fmt;

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub enum ErrorEventOnline {
    EventOnlineNotFound,
    FailedToCreateEvent(String)
}

impl fmt::Display for ErrorEventOnline {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ErrorEventOnline::EventOnlineNotFound => write!(f, "Online event not found"),
            ErrorEventOnline::FailedToCreateEvent(msg) => write!(f, "Failed to create event! Error: {}", msg)
        }
    }
}