use std::collections::HashMap;
use crate::model::tag_model::Tag;
use crate::TAGS;
use crate::ONLINE_TAGS;
use crate::TagMap;
use crate::init;
use std::collections::HashSet;
use candid::Principal;


#[ic_cdk::init]
pub fn init_tag() {
    let default_tags = init::def_tags::load_defaults();
    let mut tag_map = TagMap::new();
    for tag in default_tags {
        tag_map.insert(tag.name.clone(), tag);
    }
    TAGS.with(|tags| {
        *tags.borrow_mut() = tag_map.clone();
    });
    ONLINE_TAGS.with(|online_tags| {
       *online_tags.borrow_mut() = tag_map;
    });
}