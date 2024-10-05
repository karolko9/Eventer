use candid::CandidType;
use serde::{Deserialize, Serialize};
use crate::error::user_error::ErrorUser;


#[derive(CandidType, Clone, Debug, Serialize, Deserialize)]
pub struct Contact {
    pub email: String,
    pub phone: String,
    pub media: String,
}

impl Contact {
    pub fn new(email: String, phone: String, media: String) -> Result<Self, String> {
        if email.is_empty() && phone.is_empty() && media.is_empty() {
            return Err("Contact empty".to_string());
        }
        Ok(Contact {
            email: email,
            phone: phone,
            media: media,
        })
    }
}
