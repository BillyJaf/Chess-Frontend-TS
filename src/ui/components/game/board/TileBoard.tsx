import React from "react";
import styles from "./TileBoard.module.css";
import { useGameVisuals } from "../../../context/GameVisualsContext";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { ranksAndFiles } from "../../../utils/helpers";

const TileBoard: React.FC = () => {
  const { visualLegalMoves, visualPieceInHand } = useGameVisuals();
  const { playerColour } = useGameSettings();
  const ranksFiles = ranksAndFiles(playerColour);
  const squares = [];
  const legalMovesWithoutFen: { [startSquare: string]: string[] } = {};

  for (const startSquare in visualLegalMoves) {
    legalMovesWithoutFen[startSquare] = [startSquare];
    for (const { endSquare } of visualLegalMoves[startSquare]) {
      legalMovesWithoutFen[startSquare].push(endSquare.slice(0, 2));
    }
  }
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      const rankFile = ranksFiles[8 * row + column];

      let tileColour = (row + column) % 2 === 0 ? styles.light : styles.dark;
      if (
        !!visualPieceInHand &&
        legalMovesWithoutFen[visualPieceInHand.pieceOrigin].includes(rankFile)
      ) {
        tileColour =
          (row + column) % 2 === 0
            ? styles.lightHighlight
            : styles.darkHighlight;
      }

      squares.push(<div key={`${rankFile}-Tile`} className={tileColour} />);
    }
  }

  return <div className={styles.tileBoard}>{squares}</div>;
};

export default TileBoard;
