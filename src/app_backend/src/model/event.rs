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

impl Event {
    fn new(
        name: String, 
        time_start: String, 
        time_end: String, 
        list_of_admin: Vec<String>,
        hash_map_of_declared: HashMap<String, String>,
        hash_map_of_user_who_check: HashMap<String, String>,
    ) -> Self {
        Event {
            name,
            location: (0.0, 0.0),
            time_start,
            time_end,
            list_of_admin,
            hash_map_of_declared,
            hash_map_of_user_who_check,
        }
    }

    fn set_location(&mut self, latitude: f64, longitude: f64) -> Result<(), String> {
        if latitude < -180.0 || latitude > 180.0 {
            return Err("Latitude must be between -180 and 180.".to_string());
        }
        if longitude < -180.0 || longitude > 180.0 {
            return Err("Longitude must be between -180 and 180.".to_string());
        }
        self.location = (latitude, longitude);
        Ok(())
    }
}