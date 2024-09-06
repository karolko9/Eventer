use candid::Principal;
use std::collections::HashSet;
use crate::component;

#[derive(Debug, Clone)]
pub struct EventOnline {
    pub id: u128,
    name: String,
    url: String,
    time_start: String,
    time_end: String,
    price: f32,
    list_of_admin: Vec<Principal>,
    hash_map_of_declared: HashSet<Principal>,
    pub tags: HashSet<String>,
    description: String,
    contact: component::contact::Contact,
    thumbnail: String
}

impl EventOnline {
    pub fn new(
        id: u128,
        name: String,
        url: String,
        time_start: String,
        time_end: String,
        price: f32,
        list_of_admin: Vec<Principal>,
        hash_map_of_declared: HashSet<Principal>,
        tags: HashSet<String>,
        description: String,
        email: String,
        phone: String,
        media: String,
        thumbnail: String
    ) -> Result<Self, String> {
        let contact = component::contact::Contact::new(email, phone, media)?;
        Ok(EventOnline {
            id,
            name,
            url,
            time_start,
            time_end,
            price,
            list_of_admin,
            hash_map_of_declared,
            tags,
            description,
            contact,
            thumbnail
        })
    }
    
    //GETTERS 

    pub fn id(&self) -> u128 {
        self.id
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn url(&self) -> &str {
        &self.url
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

    pub fn hash_map_of_declared(&self) -> &HashSet<Principal> {
        &self.hash_map_of_declared
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

    //SETTERS

    pub fn set_name(&mut self, name: String) {
        self.name = name;
    }

    pub fn set_url(&mut self, url: String) {
        self.url = url;
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

    pub fn set_hash_map_of_declared(&mut self, hash_map_of_declared: HashSet<Principal>) {
        self.hash_map_of_declared = hash_map_of_declared;
    }

    pub fn set_tags(&mut self, tags: HashSet<String>) {
        self.tags = tags;
    }

    pub fn set_description(&mut self, description: String) {
        self.description = description;
    }

    pub fn set_thumbnail(&mut self, thumbnail: String) {
        self.thumbnail = thumbnail;
    }

    //adding to hash_map_of_declared
    
    pub fn add_participant(&mut self, participant: Principal) {
        self.hash_map_of_declared
            .insert(participant);
    }

}