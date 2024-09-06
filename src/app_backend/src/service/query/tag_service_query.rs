use crate::TAGS;
use crate::ONLINE_TAGS;

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