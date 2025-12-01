// Returned type from backend
interface BestMoveResponse {
    gameOver: string | null;
    uciMove: string;
    resulting_fen: string,
    moves: ResultingGameState[];
}

interface ResultingGameState {
    uciMove: string;
    resultingFEN: string;
    gameOver: string | null;
}

export async function fetchBestMove(fen: string) {
    // const response = await fetch(
    //     "https://backend-chess-bot.fly.dev/best_move", {
    //     method: "Post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fen),
    // });

    const response = await fetch(
        "https://localhost:8080/best_move", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedBestMoveResponse = JSON.parse(data) as BestMoveResponse;

    return parsedBestMoveResponse
}

