use candid::Principal;
use std::collections::HashSet;
use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Clone, Debug)]
pub struct Tag {
    name: String,
    event_id: HashSet<u128>,
}