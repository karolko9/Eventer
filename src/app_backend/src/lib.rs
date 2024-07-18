

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}! caller: {}", name, ic_cdk::caller())
}

ic_cdk::export_candid!();