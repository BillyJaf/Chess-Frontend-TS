import { fetchBestMove } from "./bestMoveFetcher";
import { fenGameToVisualGame } from "./helpers";
import { fetchLegalMoves } from "./legalMoveFetcher";

export async function makeBotMove(fen: string, setVisualGame: (fenGame: string) => void, setLegalMoves: (legalMoves: {
    [key: string]: [string, string][];
}) => void, setGameOver: (gameOver: string) => void) {
    const botMove = await fetchBestMove(fen);

    if (!botMove.winner && !botMove.stalemate) {
        setVisualGame(fenGameToVisualGame(botMove.resulting_fen.split(" ")[0]))

        const legal_moves = await fetchLegalMoves(botMove.resulting_fen)

        setLegalMoves(legal_moves.moves)
    } else {
        setLegalMoves({})
        if (botMove.winner) {
            setGameOver(botMove.winner)
        } else {
            // Stalemate
            setGameOver("-")
        }
    }
}