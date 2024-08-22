use candid::Principal;
use std::collections::{HashMap, HashSet};

#[derive(Debug, Clone)]
pub struct EventOnline {
    id: u128,
    name: String,
    url: String,
    time_start: String,
    time_end: String,
    list_of_admin: Vec<Principal>,
    hash_map_of_declared: HashSet<Principal>,
    tags: HashSet<String>,
}

impl EventOnline {
    pub fn new(
        id: u128,
        name: String,
        url: String,
        time_start: String,
        time_end: String,
        list_of_admin: Vec<Principal>,
        hash_map_of_declared: HashSet<Principal>,
        tags: HashSet<String>,
    ) -> Self {
        EventOnline {
            id,
            name,
            url,
            time_start,
            time_end,
            list_of_admin,
            hash_map_of_declared,
            tags,
        }
    }

}