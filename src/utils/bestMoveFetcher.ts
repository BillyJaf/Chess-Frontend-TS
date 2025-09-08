// Returned type from backend
interface BestMoveResponse {
    winner: string | null;
    stalemate: boolean;
    uci_move: string;
    resulting_fen: string;
}

export async function fetchBestMove(fen: string) {
    const response = await fetch(
        "http://localhost:3600/best_move", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedBestMoveResponse = JSON.parse(data) as BestMoveResponse;

    console.log(parsedBestMoveResponse)

    return parsedBestMoveResponse
}

