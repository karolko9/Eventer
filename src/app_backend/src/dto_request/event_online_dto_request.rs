#[derive(serde::Deserialize, candid::CandidType)]
pub struct EventOnlineDTO {
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
    pub url: String,
    pub price: f32,
    pub description: String,
    pub phone: String,
    pub email: String,
    pub media: String,
    pub thumbnail: String
}