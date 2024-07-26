use crate::dto_request;
use crate::{model::event::Event, service::user};
use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Clone, Debug)]
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
    pub fn new(user_dto: dto_request::request::UserDTO) -> Result<Self, String> {
        if user_dto.location.0 < -90.0
            || user_dto.location.0 > 90.0
            || user_dto.location.1 < -180.0
            || user_dto.location.1 > 180.0
        {
            return Err("Location coordinates must be between -90 to 90 ,-180 to 180.".to_string());
        }
        Ok(UserDataModel {
            name: user_dto.name,
            location: (user_dto.location.0, user_dto.location.1),
            tags: user_dto.tags,
            job: user_dto.job,
            role: user_dto.role,
            bio: user_dto.bio,
            list_of_events: Vec::new(),
        })
    }

    // Getter dla pola `name`
    pub fn get_name(&self) -> &String {
        &self.name
    }

    // Setter dla pola `name`
    pub fn set_name(&mut self, name: String) {
        self.name = name;
    }

    // Getter dla pola `location`
    pub fn get_location(&self) -> &(f64, f64) {
        &self.location
    }

    // Setter dla pola `location`
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

    // Getter dla pola `tags`
    pub fn get_tags(&self) -> &Vec<String> {
        &self.tags
    }

    // Setter dla pola `tags`
    pub fn set_tags(&mut self, tags: Vec<String>) {
        self.tags = tags;
    }

    // Getter dla pola `job`
    pub fn get_job(&self) -> &String {
        &self.job
    }

    // Setter dla pola `job`
    pub fn set_job(&mut self, job: String) {
        self.job = job;
    }

    // Getter dla pola `role`
    pub fn get_role(&self) -> &String {
        &self.role
    }

    // Setter dla pola `role`
    pub fn set_role(&mut self, role: String) {
        self.role = role;
    }

    // Getter dla pola `bio`
    pub fn get_bio(&self) -> &String {
        &self.bio
    }

    // Setter dla pola `bio`
    pub fn set_bio(&mut self, bio: String) {
        self.bio = bio;
    }

    // Metoda do dodawania wydarzeń
    pub fn add_event(&mut self, event: u128) {
        self.list_of_events.push(event);
    }
}
