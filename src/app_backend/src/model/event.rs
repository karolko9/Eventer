use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone)]
struct Event {
    name: String,
    location: (f64, f64),
    time_start: String,
    time_end: String,
    list_of_admin: Vec<String>,
    hash_map_of_declared: HashMap<String, String>,
    hash_map_of_user_who_check: HashMap<String, String>,
}