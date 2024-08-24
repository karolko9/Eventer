use std::collections::HashMap;
use crate::model::tag_model::Tag;
use crate::TAGS;
use crate::init::def_tags;
use crate::TagMap;

#[ic_cdk::init]
fn init() {
    let default_tags = def_tags::load_defaults();
    let mut tag_map = TagMap::new();
    for tag in default_tags {
        tag_map.insert(tag.name.clone(), tag);
    }
    TAGS.with(|tags| {
        *tags.borrow_mut() = tag_map;
    });
}