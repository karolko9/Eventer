use candid::{CandidType, Deserialize};
use serde::Serialize;

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
    TicketAlreadyUsed

}