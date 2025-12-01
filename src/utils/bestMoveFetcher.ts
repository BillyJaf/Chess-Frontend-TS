// Returned type from backend
interface BestMoveResponse {
    checkmate: boolean;
    stalemate: boolean;
    uci_move: string;
    resulting_fen: string;
}

export async function fetchBestMove(fen: string) {
    const response = await fetch(
        "http://backend-chess-bot.fly.dev/best_move", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedBestMoveResponse = JSON.parse(data) as BestMoveResponse;

    console.log(parsedBestMoveResponse)

    return parsedBestMoveResponse
}

