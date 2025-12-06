import React, { type JSX } from "react";
import styles from "./PieceBoard.module.css";
import { useGameVisuals } from "../../../context/GameVisualsContext";
import type { UIPieceInHand, UIPossibleGameState } from "../../../types/types";
import { fenStringToVisualFen, ranksAndFiles } from "../../../utils/helpers";
import { makeBotMove } from "../../../utils/makeBotMove";
import { useGameSettings } from "../../../context/GameSettingsContext";

const PieceBoard: React.FC = () => {
  const squares: JSX.Element[] = [];
  const {
    visualLegalMoves,
    setVisualLegalMoves,
    visualFEN,
    setVisualFEN,
    visualPieceInHand,
    setVisualPieceInHand,
    setVisualPromotionMove,
    setVisualGameOver,
  } = useGameVisuals();
  const { playerColour, setCurrentGameState, gameHistory, setGameHistory } = useGameSettings();

  const handlePickupPiece = (
    e: React.MouseEvent,
    squareIndex: number,
    square: string,
  ) => {
    const pieceCanBePickedUp = square in visualLegalMoves;

    if (!pieceCanBePickedUp) {
      return;
    }

    const piece = visualFEN.charAt(squareIndex);
    const isWhite: boolean = piece === piece.toUpperCase();
    const imagePath: string = isWhite
      ? `../assets/white-pieces/${piece}.png`
      : `../assets/black-pieces/${piece}.png`;

    // Updated
    let newPieceInHand: UIPieceInHand = {
      piecePath: imagePath,
      piece: piece,
      pieceOrigin: square,
      x: e.clientX,
      y: e.clientY,
    };
    let newVisualGame: string =
      visualFEN.slice(0, squareIndex) + "X" + visualFEN.slice(squareIndex + 1);

    setVisualPieceInHand(newPieceInHand);
    setVisualFEN(newVisualGame);
  };

  const handlePlacePiece = (squareIndex: number, square: string) => {
    const currentlyHeldPiece = visualPieceInHand!.piece;

    // Placing piece where we picked it up from:
    if (square === visualPieceInHand!.pieceOrigin) {
      setVisualPieceInHand(null);
      setVisualFEN(
        visualFEN.slice(0, squareIndex) +
          currentlyHeldPiece +
          visualFEN.slice(squareIndex + 1),
      );
      return;
    }

    let resultingGameState: UIPossibleGameState | null = null;
    for (const possibleGameState of visualLegalMoves[
      visualPieceInHand!.pieceOrigin
    ]) {
      if (possibleGameState.endSquare.slice(0, 2) === square) {
        resultingGameState = possibleGameState;
      }
    }

    // If there is no resultingGameState, then we attempted to
    // place a piece where we cannot.
    if (!resultingGameState) {
      return;
    }

    const { endSquare, resultingFEN, gameOver, sanMove } = resultingGameState;
    const pawnPromotion = endSquare.length === 3;

    setVisualPieceInHand(null);
    if (pawnPromotion) {
      setVisualFEN(
        visualFEN.slice(0, squareIndex) +
          currentlyHeldPiece +
          visualFEN.slice(squareIndex + 1),
      );
      setVisualPromotionMove(visualPieceInHand!.pieceOrigin + endSquare);
      return;
    } else {
      setVisualFEN(fenStringToVisualFen(resultingFEN, playerColour));
      setGameHistory([...gameHistory, sanMove!])
      setVisualLegalMoves({});
      if (gameOver) {
        setVisualGameOver(gameOver);
      } else {
        makeBotMove(resultingFEN, setCurrentGameState);
      }
      return;
    }
  };

  const handleClick = (
    e: React.MouseEvent,
    squareIndex: number,
    square: string,
  ) => {
    // When we click, if we don't have a piece in our hand, then we
    // are attempting to pick up a piece at that square. Otherwise,
    // we are attempting to place a piece at that square.
    if (!visualPieceInHand) {
      handlePickupPiece(e, squareIndex, square);
    } else {
      handlePlacePiece(squareIndex, square);
    }
  };

  const ranksFiles = ranksAndFiles(playerColour);

  visualFEN.split("").map((piece, i) => {
    const square = ranksFiles[i];
    const colour = piece === piece.toUpperCase() ? "white" : "black";
    const imagePath = `../assets/${colour}-pieces/${piece}.png`;

    squares.push(
      <img
        className={styles.piece}
        src={imagePath}
        alt="../assets/white-pieces/X.png"
        key={square}
        onClick={(e) => handleClick(e, i, square)}
      />,
    );
    return;
  });

  return <div className={styles.pieceBoard}>{squares}</div>;
};

export default PieceBoard;
