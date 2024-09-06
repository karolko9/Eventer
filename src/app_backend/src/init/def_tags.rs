use crate::model::tag_model::Tag;
use std::collections::HashSet;


pub fn load_defaults() -> Vec<Tag>{
    vec![
        Tag{
            name: "Crypto".to_string(),
            events_ids: HashSet::new(), 
        },
        Tag{
            name: "Blockchain".to_string(),
            events_ids: HashSet::new(),
        },
        Tag{
            name: "ICP".to_string(),
            events_ids: HashSet::new(),
        },
    ]
}