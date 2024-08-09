use candid::Principal;
use std::collections::HashSet;
use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Clone, Debug)]
pub struct Tag {
    name: String,
    events_id: HashSet<u128>,
}

impl Tag{
    pub fn new(name: String) -> Result<Self, String> {
        Ok(Tag{
            name: name,
            events_id: HashSet::new(),
        })

    }

    pub fn get_events_id(&self) -> &HashSet<u128>{
        &self.events_id
    }
}