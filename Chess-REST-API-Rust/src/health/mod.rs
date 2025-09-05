use axum::{
    Json,
};

pub async fn health_check() -> Json<String> {
    println!("Received a health check!");
    let health_message = String::from("Up and running!");
    Json::from(health_message)
}