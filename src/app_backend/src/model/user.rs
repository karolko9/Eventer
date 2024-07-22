
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
struct UserDataModel {
    name: String,
    location: (f64, f64),
    hobbies: Vec<String>,
    job: String,
    role: String,
    bio: String,
    list_of_events: Vec<Event>,
}