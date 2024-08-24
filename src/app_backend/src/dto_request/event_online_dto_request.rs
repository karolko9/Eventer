#[derive(serde::Deserialize, candid::CandidType)]
pub struct EventOnlineDTO {
    pub name: String,
    pub time_start: String,
    pub time_end: String,
    pub tags: Vec<String>,
    pub url: String,
}