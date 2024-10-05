use std::collections::HashSet;

use crate::{dto_request, error::user_error::ErrorUser};
use candid::CandidType;

#[derive(CandidType, Clone, Debug)]
pub struct UserDataModel {
    name: String,
    location: (f64, f64),
    tags: HashSet<String>,
    job: String,
    role: String,
    bio: String,
    list_of_events: HashSet<u128>,
    list_of_events_online: HashSet<u128>,
    list_of_hosted_events: HashSet<u128>,
    list_of_hosted_events_online: HashSet<u128>,
    list_of_seen_events: HashSet<u128>,
    list_of_seen_events_online: HashSet<u128>,
}

impl UserDataModel {
    pub fn new(user_dto: dto_request::user_dto_request::UserDTO) -> Result<Self, ErrorUser> {
        if user_dto.location.0 < -90.0
            || user_dto.location.0 > 90.0
            || user_dto.location.1 < -180.0
            || user_dto.location.1 > 180.0
        {
            return Err(ErrorUser::LocationCoordinatesAreIncorrect);
            //LocationCoordinatesMustBeBetweenCertainNumbers-90To90-180To180
        }
        Ok(UserDataModel {
            name: user_dto.name,
            location: (user_dto.location.0, user_dto.location.1),
            tags: user_dto.tags,
            job: user_dto.job,
            role: user_dto.role,
            bio: user_dto.bio,
            list_of_events: HashSet::new(),
            list_of_events_online: HashSet::new(),
            list_of_hosted_events: HashSet::new(),
            list_of_hosted_events_online: HashSet::new(),
            list_of_seen_events: HashSet::new(),
            list_of_seen_events_online: HashSet::new(),
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
    pub fn set_location(&mut self, latitude: f64, longitude: f64) -> Result<(), ErrorUser> {
        if latitude < -90.0 || latitude > 90.0 {
            return Err(ErrorUser::LatitudeIsIncorrect);
            //LatitudeMustBeBetweenMIN90AndPLUS90
        }
        if longitude < -180.0 || longitude > 180.0 {
            return Err(ErrorUser::LongitudeIsIncorrect);
        }
        self.location = (latitude, longitude);
        Ok(())
    }

    // Getter dla pola `tags`
    pub fn get_tags(&self) -> &HashSet<String> {
        &self.tags
    }

    // Setter dla pola `tags`
    pub fn set_tags(&mut self, tags: HashSet<String>) {
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
    
    // Setter dla pola `bio`
    // Getter dla pola `events`
    pub fn get_events(&self) -> &HashSet<u128> {
        &self.list_of_events
    }

    // Metoda do dodawania wydarzeń
    pub fn add_event(&mut self, event: u128) {
        self.list_of_events.insert(event);
    }

    // Getter dla pola `events_online`
    pub fn get_events_online(&self) -> &HashSet<u128> {
        &self.list_of_events_online
    }

    // Metoda do dodawania wydarzeń
    pub fn add_event_online(&mut self, event: u128) {
        self.list_of_events_online.insert(event);
    }

    // Getter dla pola `events`
    pub fn get_hosted_events(&self) -> &HashSet<u128> {
        &self.list_of_hosted_events
    }

    // Metoda do dodawania wydarzeń
    pub fn add_hosted_event(&mut self, event: u128) {
        self.list_of_hosted_events.insert(event);
    }

    // Getter dla pola `events_online`
    pub fn get_hosted_events_online(&self) -> &HashSet<u128> {
        &self.list_of_hosted_events_online
    }

    // Metoda do dodawania wydarzeń
    pub fn add_hosted_event_online(&mut self, event: u128) {
        self.list_of_hosted_events_online.insert(event);
    }

    // Getter dla pola `list_of_seen_events`
    pub fn get_seen_events(&self) -> &HashSet<u128> {
        &self.list_of_seen_events
    }

    // Add dla pola `list_of_seen_events`
    pub fn add_seen_events(&mut self, event_id: u128){
        self.list_of_seen_events.insert(event_id);
    }

    // Getter dla pola `list_of_seen_events_online`
    pub fn get_seen_events_online(&self) -> &HashSet<u128>{
        &self.list_of_seen_events_online
    }

    // Add dla pola `list_of_seen_events_online`
    pub fn add_seen_events_online(&mut self, event_id: u128){
        self.list_of_seen_events_online.insert(event_id);
    }
}
