use crate::component;
use candid::Principal;
use std::{
    collections::{HashMap, HashSet},
};

#[derive(Debug, Clone)]
pub struct Event {
    pub id: u128,
    name: String,
    location: (f64, f64),
    address: String,
    time_start: String,
    time_end: String,
    price: f32,
    list_of_admin: Vec<Principal>,
    hash_map_of_declared: HashMap<Principal, String>, // TODO: HashSet?
    hash_map_of_user_who_check: HashMap<Principal, String>,
    pub tags: HashSet<String>,
    description: String,
    contact: component::contact::Contact,
    thumbnail: String
}

impl Event {
    pub fn new(
        id: u128,
        name: String,
        location: (f64, f64),
        address: String,
        time_start: String,
        time_end: String,
        price: f32,
        list_of_admin: Vec<Principal>,
        hash_map_of_declared: HashMap<Principal, String>,
        hash_map_of_user_who_check: HashMap<Principal, String>,
        tags: HashSet<String>,
        description: String,
        email: String,
        phone: String,
        media: String,
        thumbnail: String
    ) -> Result<Self, String> {
        let contact = component::contact::Contact::new(email, phone, media)?;
        Ok(Event {
            id,
            name,
            location,
            address,
            time_start,
            time_end,
            price,
            list_of_admin,
            hash_map_of_declared,
            hash_map_of_user_who_check,
            tags,
            description,
            contact,
            thumbnail
        })
    }

    // Getters
    pub fn id(&self) -> u128 {
        self.id
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn location(&self) -> (f64, f64) {
        self.location
    }

    pub fn address(&self) -> &str {
        &self.address
    }

    pub fn time_start(&self) -> &str {
        &self.time_start
    }

    pub fn time_end(&self) -> &str {
        &self.time_end
    }

    pub fn price(&self) -> f32 {
        self.price
    }

    pub fn list_of_admin(&self) -> &Vec<Principal> {
        &self.list_of_admin
    }

    pub fn hash_map_of_declared(&self) -> &HashMap<Principal, String> {
        &self.hash_map_of_declared
    }

    pub fn hash_map_of_user_who_check(&self) -> &HashMap<Principal, String> {
        &self.hash_map_of_user_who_check
    }

    pub fn tags(&self) -> &HashSet<String> {
        &self.tags
    }

    pub fn description(&self) -> &str {
        &self.description
    }

    pub fn contact(&self) -> component::contact::Contact{
        self.contact.clone()
    }

    pub fn thumbnail(&self) -> String {
        self.thumbnail.clone()
    }

    // Setters
    pub fn set_name(&mut self, name: String) {
        self.name = name;
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

    pub fn set_address(&mut self, address: String) {
        self.address = address;
    }

    pub fn set_time_start(&mut self, time_start: String) {
        self.time_start = time_start;
    }

    pub fn set_time_end(&mut self, time_end: String) {
        self.time_end = time_end;
    }

    pub fn set_list_of_admin(&mut self, list_of_admin: Vec<Principal>) {
        self.list_of_admin = list_of_admin;
    }

    pub fn set_hash_map_of_declared(&mut self, hash_map_of_declared: HashMap<Principal, String>) {
        self.hash_map_of_declared = hash_map_of_declared;
    }

    pub fn set_hash_map_of_user_who_check(
        &mut self,
        hash_map_of_user_who_check: HashMap<Principal, String>,
    ) {
        self.hash_map_of_user_who_check = hash_map_of_user_who_check;
    }

    pub fn set_tags(&mut self, tags: HashSet<String>) {
        self.tags = tags;
    }

    pub fn add_participant(&mut self, participant: Principal) {
        self.hash_map_of_declared
            .insert(participant, "declared".to_string());
    }

    pub fn set_description(&mut self, description: String) {
        self.description = description;
    }

    pub fn set_thumbnail(&mut self, thumbnail: String) {
        self.thumbnail = thumbnail;
    }
}
