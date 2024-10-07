use candid::Principal;
use crate::error::event_error::ErrorEvent;
use crate::error::user_error::ErrorUser;
use crate::error::event_online_error::ErrorEventOnline;
use std::error::Error;



use std::{cell::RefCell, collections::HashMap, collections::HashSet};

mod model;
pub mod service;

use model::{event_model::Event, event_online_model::EventOnline ,user_model::UserDataModel, tag_model::Tag};

mod dto_request;
mod dto_response;

pub mod repository;

pub mod controller;
pub mod error;
pub mod component;
pub mod init;

// ticket
pub mod ticket;

use ticket::ticket::{Ticket, TicketSignature, PublicKeyReply, TicketVerification}; // Import the missing types

thread_local! {
    static USER_DATA_MODEL: RefCell<UserDataModels> = RefCell::default();
    
    static EVENTS: RefCell<EventMap> = RefCell::default();
    static NEXT_EVENT_ID: RefCell<u128> = RefCell::new(0);
    
    static EVENT_ONLINE: RefCell<EventOnlineMap> = RefCell::default();
    static NEXT_EVENT_ONLINE_ID: RefCell<u128> = RefCell::new(0);

    static TAGS: RefCell<TagMap> = RefCell::default();
    static ONLINE_TAGS: RefCell<TagMap> = RefCell::default();
}

type UserDataModels = HashMap<Principal, UserDataModel>;

type EventMap = HashMap<u128, Event>;

type EventOnlineMap = HashMap<u128, EventOnline>;

pub type TagMap = HashMap<String, Tag>;

ic_cdk::export_candid!();