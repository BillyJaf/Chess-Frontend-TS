import React, { createContext, useContext, useEffect, useState } from "react";
import { fenGameToVisualGame } from "../../utils/helpers";
import { UIGameState, type UIPieceInHand, type UIPossibleGameState } from "../types";
import { fetchLegalMoves } from "../../api/posts";
import { legalMovesResponseToUILegalMoves } from "../../api/converters";

interface VisualPosition {
    // Real current game
    currentGame: UIGameState;
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

const GameContext = createContext<VisualPosition | undefined>(undefined);
//const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const startingPosition = "k7/7R/8/8/8/6R1/8/K7 w - - 0 1"

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Construct the game:
    const currentGame = new UIGameState(startingPosition);

    const [visualGame, setVisualGame] = useState<string>(fenGameToVisualGame(currentGame.fenGame));
    const [pieceInHand, setPieceInHand] = useState<UIPieceInHand | null>(null);
    const [legalMoves, setLegalMoves] = useState<{[startSquare: string]: UIPossibleGameState[]}>({});
    const [promotionMove, setPromotionMove] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState<string | null>(null);

    useEffect(() => {
        fetchLegalMoves(startingPosition).then((legalMovesResponse) => {
            const uiLegalMoves = legalMovesResponseToUILegalMoves(legalMovesResponse)
            setGameOver(uiLegalMoves.gameOver)
            setLegalMoves(uiLegalMoves.legalMoves)
        })
    }, []);

    return (
        <GameContext.Provider value={{ currentGame, legalMoves, setLegalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand, promotionMove, setPromotionMove, gameOver, setGameOver}}>
        {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("No Context Provided.");
    }
    return context;
};