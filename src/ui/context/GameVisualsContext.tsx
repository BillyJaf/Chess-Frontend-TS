import React, { createContext, useContext, useEffect, useState } from "react";
import { fenStringToVisualGame } from "../../utils/helpers";
import { type UIPieceInHand, type UIPossibleGameState } from "../types";
import { fetchLegalMoves } from "../../api/posts";
import { legalMovesResponseToUILegalMoves } from "../../api/converters";
import { useGameSettings } from "./GameSettingsContext";
import { makeBotMove } from "../../utils/makeBotMove";

interface VisualPosition {
    // Dictionary of legal moves in current position, indexed by starting square.
    legalMoves: {[startSquare: string]: UIPossibleGameState[]}
    setLegalMoves: (legalMoves: {[startSquare: string]: UIPossibleGameState[]}) => void;
    // Visual representation of the game:
    // 64 character string holding all pieces. Blank tiles are represented with 'x'
    // If there is a piece in hand, then the corresponding square will be temporarily blank
    visualGame: string;
    setVisualGame: (fenGame: string) => void;
    pieceInHand: UIPieceInHand | null;
    setPieceInHand: (piece: UIPieceInHand | null) => void;
    // Used if we have just promoted a pawn:
    promotionMove: string | null;
    setPromotionMove: (square: string | null) => void;
    // Used if the game has ended:
    gameOver: string | null;
    setGameOver: (result: string | null) => void;
}

const GameVisualsContext = createContext<VisualPosition | undefined>(undefined);

export const GameVisualsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { playerColour, startingFEN, resetCounter } = useGameSettings();

    const [visualGame, setVisualGame] = useState<string>(fenStringToVisualGame(startingFEN, playerColour));
    const [pieceInHand, setPieceInHand] = useState<UIPieceInHand | null>(null);
    const [legalMoves, setLegalMoves] = useState<{[startSquare: string]: UIPossibleGameState[]}>({});
    const [promotionMove, setPromotionMove] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState<string | null>(null);

    useEffect(() => {
        // Reset everything
        setVisualGame(fenStringToVisualGame(startingFEN, playerColour))
        setLegalMoves({})
        setPieceInHand(null)
        setPromotionMove(null)
        setGameOver(null)
        // Get the required legalmoves / bestmove
        const fenColour = startingFEN.split(" ")[1] === 'w' ? 'White' : 'Black'
        if (playerColour === fenColour) {
            fetchLegalMoves(startingFEN).then((legalMovesResponse) => {
                const uiLegalMoves = legalMovesResponseToUILegalMoves(legalMovesResponse)
                setGameOver(uiLegalMoves.gameOver)
                setLegalMoves(uiLegalMoves.legalMoves)
            })
        } else {
            makeBotMove(startingFEN, playerColour, setVisualGame, setLegalMoves, setGameOver)
        }
    }, [resetCounter]);

    return (
        <GameVisualsContext.Provider value={{ legalMoves, setLegalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand, promotionMove, setPromotionMove, gameOver, setGameOver}}>
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