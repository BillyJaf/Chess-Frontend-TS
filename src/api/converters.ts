import type { UICurrentGameState, UIPossibleGameState, UILegalMoves, LegalMoves } from "../ui/types/types";
import type { best_move_response, legal_moves_response, ResultingGameState } from "./types";

export function legalMovesResponseToUILegalMoves(legalMovesResponse: legal_moves_response) {

    const uiGameStates = resultingGameStatesToUIGameStates(legalMovesResponse.legal_moves)

    const uiLegalMoves: UILegalMoves = {
        gameOver: legalMovesResponse.game_over,
        legalMoves: uiGameStates
    }

    return uiLegalMoves
}

export function bestMoveResponseToUICurrentGameState(bestMoveResponse: best_move_response) {

    const uiGameStates = resultingGameStatesToUIGameStates(bestMoveResponse.resulting_legal_moves)

    const uiCurrentGameState: UICurrentGameState = {
        gameOver: bestMoveResponse.game_over,
        uciMove: bestMoveResponse.uci_move,
        fen: bestMoveResponse.resulting_fen,
        legalMoves: uiGameStates,
    }

    return uiCurrentGameState
}

export function resultingGameStatesToUIGameStates(resultingGameStates: ResultingGameState[]) {
    const uiGameStates: LegalMoves = {}

    for (const { uci_move, resulting_fen, game_over } of resultingGameStates) {

        const startSquare = uci_move.slice(0, 2);
        const endSquare = uci_move.slice(2);

        const uiGameState: UIPossibleGameState = {
            endSquare,
            resultingFEN: resulting_fen,
            gameOver: game_over
        }
        
        
        if (startSquare in uiGameStates) {
            uiGameStates[startSquare].push(uiGameState)
        } else {
            uiGameStates[startSquare] = [uiGameState]
        }
    }

    return uiGameStates
}