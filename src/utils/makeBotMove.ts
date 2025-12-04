import { bestMoveResponseToUICurrentGameState } from "../api/converters";
import { fetchBestMove } from "../api/posts";
import type { UIPossibleGameState } from "../ui/types";
import { fenStringToVisualGame } from "./helpers";

export async function makeBotMove(
    fen: string, 
    playerColour: string,
    setVisualGame: (fenGame: string) => void, 
    setLegalMoves: (legalMoves: { [startSquare: string]: UIPossibleGameState[]; }) => void, 
    setGameOver: (gameOver: string | null) => void
) {
    const apiBestMove = await fetchBestMove(fen)
    const uiCurrentGameState = bestMoveResponseToUICurrentGameState(apiBestMove)

    setVisualGame(fenStringToVisualGame(uiCurrentGameState.resultingFEN, playerColour))
    setLegalMoves(uiCurrentGameState.resultingLegalMoves)
    setGameOver(uiCurrentGameState.gameOver)
}