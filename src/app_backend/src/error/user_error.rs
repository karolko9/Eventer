use candid::{CandidType, Deserialize};
use serde::Serialize;
use std::fmt;

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub enum ErrorUser {
    FailedToUpdateUserData,
    UserNotFound,
    LocationCoordinatesAreIncorrect,
    LongitudeIsIncorrect,
    LatitudeIsIncorrect,
    EventNotFound,
    UserIsAlreadyDeclared,
    HostCannotJoinTheirOwnEvent,
    SignWithEcdsaFailed(String),
    ContactEmpty,
    TicketAlreadyUsed,
    UserIsNotAnAdmin

}

impl fmt::Display for ErrorUser {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ErrorUser::FailedToUpdateUserData => write!(f, "Failed to update user data"),
            ErrorUser::UserNotFound => write!(f, "User not found"),
            ErrorUser::LocationCoordinatesAreIncorrect => write!(f, "Location Coordinates should be between -90 and 90 for latitude and between -180 and 180 for longitude"),
            ErrorUser::LongitudeIsIncorrect => write!(f, "Longitude should be between -180 and 180"),
            ErrorUser::LatitudeIsIncorrect => write!(f, "Latitude should be between -180 and 180"),
            ErrorUser::EventNotFound => write!(f, "Event not found"),
            ErrorUser::UserIsAlreadyDeclared => write!(f, "User is already declared"),
            ErrorUser::HostCannotJoinTheirOwnEvent => write!(f, "Host cannot join their own event"),
            ErrorUser::SignWithEcdsaFailed(msg) => write!(f, "Sign with ECDSA failed! Error: {}", (msg)),
            ErrorUser::ContactEmpty => write!(f, "Contact information is empty"),
            ErrorUser::TicketAlreadyUsed => write!(f, "Ticket is already used"),
            ErrorUser::UserIsNotAnAdmin => write!(f, "User is not an admin")
        }
    }
}