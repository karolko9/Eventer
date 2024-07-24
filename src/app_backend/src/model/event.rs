use candid::Principal;
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Event {
    id: u128,
    name: String,
    location: (f64, f64),
    time_start: String,
    time_end: String,
    list_of_admin: Vec<Principal>,
    hash_map_of_declared: HashMap<Principal, String>,
    hash_map_of_user_who_check: HashMap<Principal, String>,
}

impl Event {
    pub fn new(
        id: u128,
        name: String, 
        time_start: String, 
        time_end: String, 
        list_of_admin: Vec<Principal>,
        hash_map_of_declared: HashMap<Principal, String>,
        hash_map_of_user_who_check: HashMap<Principal, String>,
    ) -> Self {
        Event {
            id,
            name,
            location: (0.0, 0.0),
            time_start,
            time_end,
            list_of_admin,
            hash_map_of_declared,
            hash_map_of_user_who_check,
        }
    }

    pub fn set_location(&mut self, latitude: f64, longitude: f64) -> Result<(), String> {
        if latitude < -90.0 || latitude > 90.0 {
            return Err("Latitude must be between -90 and 90.".to_string());
        }
        if longitude < -180.0 || longitude > 180.0 {
            return Err("Longitude must be between -180 and 180.".to_string());
        }
        self.location = (latitude, longitude);
        Ok(())
    }
}