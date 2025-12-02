import React from "react";
import styles from "./TileBoard.module.css"
import { useGameVisuals } from "../../../context/GameVisualsContext";
import { useGameSettings } from "../../../context/GameSettingsContext";

const TileBoard: React.FC = () => {
  const squares = [];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const { legalMoves, pieceInHand } = useGameVisuals();
  const { playerColour } = useGameSettings();

  const legalMovesWithoutFen: {[key: string]: string[]} = {};
  for (const startSquare in legalMoves) {
    for (const { endSquare } of legalMoves[startSquare]) {
        if (startSquare in legalMovesWithoutFen) {
            legalMovesWithoutFen[startSquare].push(endSquare.slice(0,2))
        } else {
            legalMovesWithoutFen[startSquare] = [endSquare.slice(0,2)]
        }
    }
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {

        const square: string = playerColour === 'White' ? `${files[col]}${8 - row}` : `${files[7 - col]}${row + 1}`;

        // Light Squares:
        if ((row + col) % 2 === 0) {
            // If we are holding a piece, highlight available squares:
            if (!!pieceInHand && (square === pieceInHand.pieceOrigin || legalMovesWithoutFen[pieceInHand.pieceOrigin].includes(square))) {
                squares.push(
                    <div
                    key={`${square}-Tile`}
                    className={styles.lightHighlight}
                    />
                );
            }
            else {
                squares.push(
                    <div
                    key={`${square}-Tile`}
                    className={styles.light}
                    />
                );
            }
        }

        // Dark Squares:
        else {
            // If we are holding a piece, highlight available squares:
            if (!!pieceInHand && (square === pieceInHand.pieceOrigin || legalMovesWithoutFen[pieceInHand.pieceOrigin].includes(square))) {
                squares.push(
                    <div
                    key={`${square}-Tile`}
                    className={styles.darkHighlight}
                    />
                );
            }
            else {
                squares.push(
                    <div
                    key={`${square}-Tile`}
                    className={styles.dark}
                    />
                );
            }
        }
    }
  }

  return <div className={styles.tileBoard}>{squares}</div>;
};

export default TileBoard;