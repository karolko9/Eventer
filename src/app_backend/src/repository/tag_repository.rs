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

pub fn add_tag_to_event(event_id: u128, tag: String) {
    TAGS.with(|tags| {
        let mut tags_map = tags.borrow_mut();
        if let Some(tag) = tags_map.get_mut(&tag) {
            tag.add_event_id(event_id);
        } else {
            let mut tagS = Tag::new(tag.clone()).unwrap();
            tagS.add_event_id(event_id);
            tags_map.insert(tag, tagS);
        }
    });
}