import React, { createContext, useContext, useState } from "react";
import type { UICurrentGameState } from "../types/types";
import { startingGameState } from "../utils/constants";

interface GameSettings {
  playerColour: string;
  setPlayerColour: (player: string) => void;
  currentGameState: UICurrentGameState;
  setCurrentGameState: (currentGameState: UICurrentGameState) => void;
  // Indicates if this is the first move of the game:
  firstMove: boolean;
  setFirstMove: (firstMove: boolean) => void;
}

const GameSettingsContext = createContext<GameSettings | undefined>(undefined);

export const GameSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playerColour, setPlayerColour] = useState<string>("White");
  const [currentGameState, setCurrentGameState] =
    useState<UICurrentGameState>(startingGameState);
  const [firstMove, setFirstMove] = useState<boolean>(true);

  return (
    <GameSettingsContext.Provider
      value={{
        playerColour,
        setPlayerColour,
        currentGameState,
        setCurrentGameState,
        firstMove,
        setFirstMove,
      }}
    >
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
