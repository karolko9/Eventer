use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;



thread_local! {
    // The memory manager is used for simulating multiple memories. Given a `MemoryId` it can
    // return a memory that can be used by stable structures.
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Initialize a V2 BTreeMap that supports unbounded keys and values.
    static ASSETS: RefCell<StableBTreeMap<String, Vec<u8>, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );
}

#[ic_cdk::query]
fn get(key: String) -> Option<Vec<u8>> {
    let value = ASSETS.with(|p| p.borrow().get(&key));
    if let Some(ref v) = value {
        ic_cdk::println!("Fetched data of size: {}", v.len());
    }
    value
}

#[ic_cdk::update]
fn insert(key: String, value: Vec<u8>) -> Option<Vec<u8>> {
    ic_cdk::println!("Inserting data of size: {}", value.len());
    ASSETS.with(|p| p.borrow_mut().insert(key, value))
}

ic_cdk::export_candid!();