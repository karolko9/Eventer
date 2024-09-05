use crate::TAGS;
use crate::ONLINE_TAGS;
use crate::service;

#[ic_cdk::query]
fn fetch_all_tag_names() -> Vec<String> {
    service::query::tag_service_query::get_all_tag_names()
}

#[ic_cdk::query]
fn fetch_all_online_tag_names() -> Vec<String> {
    service::query::tag_service_query::get_all_online_tag_names()
}

#[ic_cdk::update]
fn fill_tags_with_defaults(){
    service::query::tag_service_query::fill_tags_with_defaults();
}