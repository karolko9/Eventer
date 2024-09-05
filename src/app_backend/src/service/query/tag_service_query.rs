use crate::TAGS;
use crate::ONLINE_TAGS;
use crate::model::tag_model::Tag;
use crate::init;

pub fn get_all_tag_names() -> Vec<String> {
    TAGS.with(|tags| {
        tags.borrow().keys().cloned().collect()
    })
}

pub fn get_all_online_tag_names() -> Vec<String> {
    ONLINE_TAGS.with(|tags| {
        tags.borrow().keys().cloned().collect()
    })
}

pub fn fill_tags_with_defaults(){
    init::init_tags::init_tag();
}