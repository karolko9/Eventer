use crate::service;

//QUERY

#[ic_cdk::query]
fn fetch_all_offline_tag_names() -> Vec<String> {
    service::query::tag_service_query::get_all_tag_names()
}

#[ic_cdk::query]
fn fetch_all_online_tag_names() -> Vec<String> {
    service::query::tag_service_query::get_all_online_tag_names()
}

//UPDATE

#[ic_cdk::update]
fn fill_tags_with_defaults(){
    service::update::tag_service_update::fill_tags_with_defaults();
}