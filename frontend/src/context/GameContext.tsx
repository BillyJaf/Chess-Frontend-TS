import React, { createContext, useContext, useState } from "react";
import { FenPosition, type PieceInHand } from "../utils/types";
import { fenGameToVisualGame } from "../utils/helpers";

interface VisualPosition {
    // Real current game
    currentGame: FenPosition;
    legalMoves: {[key: string]: string[]}
    // Visual representation of the game:
    // 64 character long string holding all pieces. Blank tiles are represented with 'x'
    // If there is a piece in hand, then the corresponding square will be temporaily blank
    visualGame: string;
    setVisualGame: (fenGame: string) => void;
    pieceInHand: PieceInHand | null;
    setPieceInHand: (piece: PieceInHand | null) => void;
}

const GameContext = createContext<VisualPosition | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Construct the game:
    const currentGame = new FenPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const legalMoves = {"a1":["a5","a6","a7"]};
    const [visualGame, setVisualGame] = useState<string>(fenGameToVisualGame(currentGame.fenGame));
    const [pieceInHand, setPieceInHand] = useState<PieceInHand | null>(null);

    return (
        <GameContext.Provider value={{ currentGame, legalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand}}>
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