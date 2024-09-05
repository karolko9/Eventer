use std::collections::{HashMap, HashSet};

use crate::TAGS;
use crate::ONLINE_TAGS;
use crate::model::tag_model::Tag;

//FULL REWORK FOR ONLINE EVENTS!!

//There is not implemented adding to TAGS so
//it needs to be differently
//THIS FUNCTION HASNT RIGHT TO WORK!
//I need to add to TAGS and ONLINE_TAGS every new tag!

pub fn get_events_id(tag_name: String) -> Option<HashSet<u128>> {
    TAGS.with(|tags| {
        tags.borrow().get(&tag_name).map(
            |tag| tag.get_events_ids().clone()
        )
    })
}

pub fn get_online_events_id(tag_name: String) -> Option<HashSet<u128>> {
    ONLINE_TAGS.with(|tags| {
        tags.borrow().get(&tag_name).map(
            |tag| tag.get_events_ids().clone()
        )
    })
}

pub fn get_events_id_by_tags(tags: Vec<String>) -> HashSet<u128>{

    let mut event_ids = HashSet::new();

    for tag in tags {
        if let Some(tag_event_ids) = get_online_events_id(tag) {
            event_ids.extend(tag_event_ids);
        }
    }

    event_ids
}

pub fn get_online_events_id_by_tags(tags: Vec<String>) -> HashSet<u128>{
    let mut event_ids = HashSet::new();

    //this is ref for upper functions! 
    for tag in tags {
        if let Some(tag_event_ids) = get_online_events_id(tag) {
            event_ids.extend(tag_event_ids);
        }
    }

    event_ids
}

//next thing: get_events_id_by_tags

//???