import type { best_move_response, legal_moves_response } from "./types";

export async function fetchBestMove(fen: string) {
    // const response = await fetch(
    //     "https://backend-chess-bot.fly.dev/best_move", {
    //     method: "Post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fen),
    // });

    const response = await fetch(
        "http://localhost:8080/best_move", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedBestMoveResponse = JSON.parse(data) as best_move_response;

    return parsedBestMoveResponse
}

export async function fetchLegalMoves(fen: string) {
    // const response = await fetch(
    //     "https://backend-chess-bot.fly.dev/legal_moves", {
    //     method: "Post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fen),
    // });

    const response = await fetch(
        "http://localhost:8080/legal_moves", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedLegalMovesResponse = JSON.parse(data) as legal_moves_response;

    return parsedLegalMovesResponse
}
