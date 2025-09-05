use axum::{
    routing::get,
    routing::post,
    Router,
};

mod health;
mod chess;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/health", get(health::health_check))
        .route("/chess/check-fen", post(chess::check_fen));

    let address = "0.0.0.0:3600";
    let listener = tokio::net::TcpListener::bind(address).await.unwrap();

    axum::serve(listener, app).await.unwrap();
}