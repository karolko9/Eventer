#[derive(serde::Deserialize, candid::CandidType)]
pub struct EventDTO {
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
    pub location: (f64, f64),
    pub address: String,
    pub price: f32,
    pub description: String,
    pub phone: String,
    pub email: String,
    pub media: String,
    pub thumbnail: String
}