use crate::NEXT_EVENT_ID;

pub fn generate_event_id() -> u128{
    let event_id = NEXT_EVENT_ID.with(|next_id| {
    let mut id_counter = next_id.borrow_mut();
    let current_id = *id_counter;
    *id_counter += 1;
    current_id
    });

    event_id
}