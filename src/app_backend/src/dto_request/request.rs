
#[derive(serde::Deserialize, candid::CandidType)]
pub struct UserDTO {
    pub name: String,
    pub location: (f64, f64),
    pub tags: Vec<String>,
    pub job: String,
    pub role: String,
    pub bio: String,
}

#[derive(serde::Deserialize, candid::CandidType)]
pub struct EventDTO {
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
    pub location: (f64, f64),
}

