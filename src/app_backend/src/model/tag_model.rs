use candid::Principal;
use std::collections::HashMap;

pub struct Tag {
    id: u128,
    name: String,
    location: (f64, f64),
    address: String,
    time_start: String,
    time_end: String,
    list_of_admin: Vec<Principal>,
    hash_map_of_declared: HashMap<Principal, String>,
    hash_map_of_user_who_check: HashMap<Principal, String>,
    tags: Vec<String>,
}