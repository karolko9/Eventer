use std::collections::HashSet;


#[derive(serde::Deserialize, candid::CandidType)]
pub struct UserDTO {
    pub name: String,
    pub location: (f64, f64),
    pub tags: HashSet<String>,
    pub job: String,
    pub role: String,
    pub bio: String,
}