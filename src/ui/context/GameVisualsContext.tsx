import React, { createContext, useContext, useEffect, useState } from "react";
import { fenStringToVisualFen } from "../utils/helpers";
import { type LegalMoves, type UIPieceInHand } from "../types/types";
import { fetchBestMove, fetchLegalMoves } from "../../api/posts";
import { bestMoveResponseToUICurrentGameState, legalMovesResponseToUILegalMoves } from "../../api/converters";
import { useGameSettings } from "./GameSettingsContext";

interface VisualPosition {
    // Visual representation of the game:
    // 64 character string holding all pieces. Blank tiles are represented with 'x'
    // If there is a piece in hand, then the corresponding square will be temporarily blank:
    visualFEN: string;
    setVisualFEN: (fenGame: string) => void;
    // Dictionary of legal moves in current position, indexed by starting square:
    visualLegalMoves: LegalMoves;
    setVisualLegalMoves: (legalMoves: LegalMoves) => void;
    // Piece we are holding in our hand (follows the mouse around):
    visualPieceInHand: UIPieceInHand | null;
    setVisualPieceInHand: (piece: UIPieceInHand | null) => void;
    // Used if we have just promoted a pawn - opens piece selection modal:
    visualPromotionMove: string | null;
    setVisualPromotionMove: (square: string | null) => void;
    // Used if the game has ended - opens game over modal:
    visualGameOver: string | null;
    setVisualGameOver: (result: string | null) => void;
}

const GameVisualsContext = createContext<VisualPosition | undefined>(undefined);

export const GameVisualsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { playerColour, currentGameState, setCurrentGameState, firstMove, setFirstMove } = useGameSettings();

    const { gameOver, fen, legalMoves } = currentGameState;

    const [visualFEN, setVisualFEN] = useState<string>(fenStringToVisualFen(fen, playerColour));
    const [visualLegalMoves, setVisualLegalMoves] = useState<LegalMoves>(legalMoves);
    const [visualPieceInHand, setVisualPieceInHand] = useState<UIPieceInHand | null>(null);
    const [visualPromotionMove, setVisualPromotionMove] = useState<string | null>(null);
    const [visualGameOver, setVisualGameOver] = useState<string | null>(null);

    // Resetting the game:
    useEffect(() => {
        if (!firstMove) {
            return;
        }

        const fenColour = fen.split(" ")[1] === 'w' ? 'White' : 'Black'
        if (playerColour === fenColour) {
            fetchLegalMoves(fen).then((legalMovesResponse) => {
                const uiLegalMoves = legalMovesResponseToUILegalMoves(legalMovesResponse);
                const uiCurrentGameState = {
                    gameOver: uiLegalMoves.gameOver,
                    uciMove: null,
                    fen,
                    legalMoves: uiLegalMoves.legalMoves,
                }
                setCurrentGameState(uiCurrentGameState);
            })
        } else {
            fetchBestMove(fen).then((bestMoveResponse) => {
                const uiCurrentGameState = bestMoveResponseToUICurrentGameState(bestMoveResponse);
                setCurrentGameState(uiCurrentGameState);
            })
        }

        setFirstMove(false);
    }, [firstMove]);

    // Update the visual state whenever the real state changes.
    useEffect(() => {
        setVisualFEN(fenStringToVisualFen(fen, playerColour));
        setVisualLegalMoves(legalMoves);
        setVisualPieceInHand(null);
        setVisualPromotionMove(null);
        setVisualGameOver(gameOver)
    }, [currentGameState]);

    return (
        <GameVisualsContext.Provider value={{
            visualFEN, setVisualFEN,
            visualLegalMoves, setVisualLegalMoves,
            visualPieceInHand, setVisualPieceInHand,
            visualPromotionMove, setVisualPromotionMove,
            visualGameOver, setVisualGameOver,
        }}>
            {children}
        </GameVisualsContext.Provider>
    );
};

export const useGameVisuals = () => {
    const context = useContext(GameVisualsContext);
    if (!context) {
        throw new Error("No Context Provided.");
    }
    return context;
};