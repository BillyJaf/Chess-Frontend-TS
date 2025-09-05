use axum::{
    http::StatusCode, 
    response::{IntoResponse, Response},
    Json,
};

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Fen {
    board: String,
    active_colour: char,
    castle_availability: String,
    en_passant_target: String,
    halfmove_clock: u32,
    fullmove_clock: u32,
}

impl Fen {
    fn try_from(possible_fen: &str) -> Result<Fen, FenError> {
        
        let gamestate: Vec<&str> = possible_fen.trim().split_whitespace().collect();

        if gamestate.len() != 6 {
            return Err(FenError::InvalidArgCount(format!("Requires 6 FEN arguments but got {}",gamestate.len())));
        } 

        let board = gamestate[0].to_string();

        let active_colour = match gamestate[1] {
            "w" | "b" => gamestate[1].chars().next().unwrap(),
            _ => return Err(FenError::InvalidActiveColour),
        };

        let castle_availability = gamestate[2].to_string();

        let en_passant_target = gamestate[3].to_string();

        let halfmove_clock = gamestate[4].parse::<u32>().map_err(|_| FenError::InvalidHalfmoveClock)?;

        let fullmove_clock = gamestate[5].parse::<u32>().map_err(|_| FenError::InvalidFullmoveClock)?;

        Ok(Fen {
            board,
            active_colour,
            castle_availability,
            en_passant_target,
            halfmove_clock,
            fullmove_clock,
        })
    }
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub enum FenError {
    InvalidBoard,
    InvalidActiveColour,
    InvalidCastleAvailability,
    InvalidEnPassant,
    InvalidHalfmoveClock,
    InvalidFullmoveClock,
    InvalidArgCount(String),
}

impl IntoResponse for FenError {
    fn into_response(self) -> Response {
        match self {
            FenError::InvalidBoard => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid board state."),
            ).into_response(),

            FenError::InvalidActiveColour => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid active colour."),
            ).into_response(),

            FenError::InvalidCastleAvailability => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid castle availability."),
            ).into_response(),

            FenError::InvalidEnPassant => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid en passant target."),
            ).into_response(),

            FenError::InvalidHalfmoveClock => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid halfmove clock."),
            ).into_response(),

            FenError::InvalidFullmoveClock => (
                StatusCode::UNPROCESSABLE_ENTITY,
                String::from("Invalid fullmove clock."),
            ).into_response(),

            FenError::InvalidArgCount(msg) => (
                StatusCode::UNPROCESSABLE_ENTITY,
                msg,
            ).into_response(),
        }
    }
}

#[axum::debug_handler]
pub async fn check_fen(Json(fen_input): Json<String>) -> Result<Json<Fen>, FenError> {
    println!("Checking the validity of: {}", fen_input);
    let parsed_fen = Fen::try_from(&fen_input)?;
    Ok(Json(parsed_fen))
}