import { bestMoveResponseToUIBestMove } from "../api/converters";
import { fetchBestMove } from "../api/posts";
import type { UIPossibleGameState } from "../ui/types";
import { fenGameToVisualGame } from "./helpers";

export async function makeBotMove(
    fen: string, 
    setVisualGame: (fenGame: string) => void, 
    setLegalMoves: (legalMoves: { [startSquare: string]: UIPossibleGameState[]; }) => void, 
    setGameOver: (gameOver: string | null) => void
) {
    const apiBestMove = await fetchBestMove(fen)
    const uiBestMove = bestMoveResponseToUIBestMove(apiBestMove)
    console.log(uiBestMove)

    setVisualGame(fenGameToVisualGame(uiBestMove.resultingFEN.split(" ")[0]))
    setLegalMoves(uiBestMove.resultingLegalMoves)
    setGameOver(uiBestMove.gameOver)
}