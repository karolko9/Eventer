use crate::model::event::Event;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug)]
pub struct UserDataModel {
    name: String,
    location: (f64, f64),
    tags: Vec<String>,
    job: String,
    role: String,
    bio: String,
    list_of_events: Vec<u128>,
}

impl UserDataModel {
    pub fn new(
        name: String,
        location: (f64, f64),
        tags: Vec<String>,
        job: String,
        role: String,
        bio: String,
    ) -> Result<Self, String> {
        if location.0 < -90.0 || location.0 > 90.0 || location.1 < -180.0 || location.1 > 180.0 {
            return Err("Location coordinates must be between -180 and 180.".to_string());
        }
        Ok(UserDataModel {
            name,
            location,
            tags,
            job,
            role,
            bio,
            list_of_events: Vec::new(),
        })
    }

    pub fn set_location(&mut self, latitude: f64, longitude: f64) -> Result<(), String> {
        if latitude < -90.0 || latitude > 90.0 {
            return Err("Latitude must be between -180 and 180.".to_string());
        }
        if longitude < -180.0 || longitude > 180.0 {
            return Err("Longitude must be between -180 and 180.".to_string());
        }
        self.location = (latitude, longitude);
        Ok(())
    }

    pub fn add_event(&mut self, event: u128) {
        self.list_of_events.push(event);
    }

    pub fn tags(&self) -> &Vec<String> {
        &self.tags
    }
}