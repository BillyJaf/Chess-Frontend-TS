import React, { createContext, useContext, useEffect, useState } from "react";
import { FenPosition, type PieceInHand } from "../utils/types";
import { fenGameToVisualGame } from "../utils/helpers";
import { fetchLegalMoves } from "../utils/legalMoveFetcher";

interface InternalGameState {
    endSquare: string;
    resultingFEN: string;
    gameOver: string | null;
}

interface VisualPosition {
    // Real current game
    currentGame: FenPosition;
    
    legalMoves: {[key: string]: InternalGameState[]}
    setLegalMoves: (legalMoves: {[key: string]: InternalGameState[]}) => void;
    // Visual representation of the game:
    // 64 character string holding all pieces. Blank tiles are represented with 'x'
    // If there is a piece in hand, then the corresponding square will be temporaily blank
    visualGame: string;
    setVisualGame: (fenGame: string) => void;
    pieceInHand: PieceInHand | null;
    setPieceInHand: (piece: PieceInHand | null) => void;
    // Used if we have just promoted a pawn:
    promotionMove: string | null;
    setPromotionMove: (square: string | null) => void;
    // Used if the game has ended:
    gameOver: string | null;
    setGameOver: (winner: string) => void;
}

const GameContext = createContext<VisualPosition | undefined>(undefined);
const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Construct the game:
    const currentGame = new FenPosition(startingPosition);

    const [visualGame, setVisualGame] = useState<string>(fenGameToVisualGame(currentGame.fenGame));
    const [pieceInHand, setPieceInHand] = useState<PieceInHand | null>(null);
    const [legalMoves, setLegalMoves] = useState<{[key: string]: InternalGameState[]}>({});
    const [promotionMove, setPromotionMove] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState<string>("");

    useEffect(() => {
        fetchLegalMoves(startingPosition).then((data) => {
            setLegalMoves(data!.moves)
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