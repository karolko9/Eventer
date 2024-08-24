use std::collections::{HashMap, HashSet};

use crate::TAGS;
use crate::model::tag_model::Tag;

pub fn get_events_id(tag_name: String) -> Option<HashSet<u128>> {
    TAGS.with(|tags| {
        tags.borrow().get(&tag_name).map(|tag| tag.get_events_ids().clone())
    })
}

pub fn get_events_id_by_tags(tags: Vec<String>) -> HashSet<u128>{
    let mut event_ids = HashSet::new();

    for tag in tags {
        if let Some(tag_event_ids) = get_events_id(tag) {
            event_ids.extend(tag_event_ids);
        }
    }

    event_ids
}

//???