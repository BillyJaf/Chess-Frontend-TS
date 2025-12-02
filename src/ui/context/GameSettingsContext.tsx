import React, { createContext, useContext, useState } from "react";

interface GameSettings {
    playerColour: string;
    setPlayerColour: (player: string) => void;
    startingFEN: string;
    setStartingFEN: (FEN: string) => void;
    resetCounter: number;
    setResetCounter: (resetCounter: number) => void;
}

const GameSettingsContext = createContext<GameSettings | undefined>(undefined);

export const GameSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [playerColour, setPlayerColour] = useState<string>('White');
    const [startingFEN, setStartingFEN] = useState<string>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [resetCounter, setResetCounter] = useState<number>(0);

    return (
        <GameSettingsContext.Provider value={{ playerColour, setPlayerColour, startingFEN, setStartingFEN, resetCounter, setResetCounter }}>
        {children}
        </GameSettingsContext.Provider>
    );
};

export const useGameSettings = () => {
    const context = useContext(GameSettingsContext);
    if (!context) {
        throw new Error("No Context Provided.");
    }
    return context;
};