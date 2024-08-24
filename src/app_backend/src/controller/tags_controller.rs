use crate::TAGS;
use crate::service;

#[ic_cdk::query]
fn fetch_all_tag_names() -> Vec<String> {
    service::query::tag_service_query::get_all_tag_names()
}