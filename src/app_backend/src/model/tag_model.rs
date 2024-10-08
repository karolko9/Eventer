use candid::Principal;
use std::collections::HashSet;
use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Clone, Debug)]
pub struct Tag {
    pub name: String,
    pub events_ids: HashSet<u128>,
}

impl Tag{
    pub fn new(name: String) -> Result<Self, String> {
        Ok(Tag{
            name: name,
            events_ids: HashSet::new(),
        })

    }

    pub fn get_events_ids(&self) -> &HashSet<u128>{
        &self.events_ids
    }

    pub fn add_event_id(&mut self, event_id: u128){
        self.events_ids.insert(event_id);
    }

}