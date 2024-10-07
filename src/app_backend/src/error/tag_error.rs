use candid::{CandidType, Deserialize};
use serde::Serialize;
use std::fmt;

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub enum ErrorTag {
    NameNotAssigned,
    CreatingNewTagFailed
}

impl fmt::Display for ErrorTag {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ErrorTag::NameNotAssigned => write!(f, "Name is not assigned"),
            ErrorTag::CreatingNewTagFailed => write!(f, "Creating new tag failed")
        }
    }
}