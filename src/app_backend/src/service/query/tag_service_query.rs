use crate::TAGS;
use crate::model::tag_model::Tag;

pub fn get_all_tag_names() -> Vec<String> {
    TAGS.with(|tags| {
        tags.borrow().keys().cloned().collect()
    })
}
