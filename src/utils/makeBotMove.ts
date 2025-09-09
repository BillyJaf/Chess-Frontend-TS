import { fetchBestMove } from "./bestMoveFetcher";
import { fenGameToVisualGame } from "./helpers";
import { fetchLegalMoves } from "./legalMoveFetcher";

export async function makeBotMove(fen: string, setVisualGame: (fenGame: string) => void, setLegalMoves: (legalMoves: {
    [key: string]: [string, string][];
}) => void, setGameOver: (gameOver: string) => void) {
    const botMove = await fetchBestMove(fen);

    setVisualGame(fenGameToVisualGame(botMove.resulting_fen.split(" ")[0]))
    if (!botMove.checkmate && !botMove.stalemate) {
        const legal_moves = await fetchLegalMoves(botMove.resulting_fen)

        setLegalMoves(legal_moves.moves)
    } else {
        setLegalMoves({})
        if (botMove.checkmate) {
            setGameOver(botMove.resulting_fen.split(" ")[1])
        } else {
            // Stalemate
            setGameOver("-")
        }
    }
}