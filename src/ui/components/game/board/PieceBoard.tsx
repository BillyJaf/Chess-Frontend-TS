import React, { type JSX } from "react";
import styles from "./PieceBoard.module.css"
import { useGameVisuals } from "../../../context/GameVisualsContext";
import type { UIPieceInHand, UIPossibleGameState } from "../../../types";
import { fenStringToVisualGame, ranksAndFiles } from "../../../../utils/helpers";
import { makeBotMove } from "../../../../utils/makeBotMove";
import { useGameSettings } from "../../../context/GameSettingsContext";

const PieceBoard: React.FC = () => {
    const squares: JSX.Element[] = [];
    const { legalMoves, setLegalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand, setPromotionMove, setGameOver } = useGameVisuals();
    const { playerColour } = useGameSettings();

    const handlePickupPiece = (e: React.MouseEvent, squareIndex: number, square: string) => {
        const pieceCanBePickedUp = square in legalMoves;

        if (!pieceCanBePickedUp) {
            return;
        }

        const piece = visualGame.charAt(squareIndex);
        const isWhite: boolean = piece === piece.toUpperCase();
        const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

        // Updated
        let newPieceInHand: UIPieceInHand = {
            piecePath: imagePath,
            piece: piece,
            pieceOrigin: square,
            x: e.clientX,
            y: e.clientY,
        };
        let newVisualGame: string = visualGame.slice(0, squareIndex) + 'X' + visualGame.slice(squareIndex + 1)

        setPieceInHand(newPieceInHand)
        setVisualGame(newVisualGame)
    }

    const handlePlacePiece = (squareIndex: number, square: string) => {
        const currentlyHeldPiece = pieceInHand!.piece;

        // Placing piece where we picked it up from:
        if (square === pieceInHand!.pieceOrigin) {
            setPieceInHand(null)
            setVisualGame(visualGame.slice(0, squareIndex) + currentlyHeldPiece + visualGame.slice(squareIndex + 1))
            return;
        }

        let resultingGameState: UIPossibleGameState | null = null;
        for (const possibleGameState of legalMoves[pieceInHand!.pieceOrigin]) {
            if (possibleGameState.endSquare.slice(0,2) === square) {
                resultingGameState = possibleGameState;
            }
        }

        // If there is no resultingGameState, then we attempted to
        // place a piece where we cannot.
        if (!resultingGameState) {
            return;
        }

        const { endSquare, resultingFEN, gameOver } = resultingGameState
        const pawnPromotion = endSquare.length === 3

        if (pawnPromotion) {
            setPieceInHand(null)
            setVisualGame(visualGame.slice(0, squareIndex) + currentlyHeldPiece + visualGame.slice(squareIndex + 1))
            setPromotionMove(pieceInHand!.pieceOrigin + endSquare);
            return;
        } else {
            setPieceInHand(null)
            setVisualGame(fenStringToVisualGame(resultingFEN, playerColour))
            setLegalMoves({})
            if (!!gameOver) {
                setGameOver(gameOver)
            } else {
                makeBotMove(resultingFEN, playerColour, setVisualGame, setLegalMoves, setGameOver)
            }
            return;
        }
    }

    const handleClick = (e: React.MouseEvent, squareIndex: number, square: string) => {
        // When we click, if we don't have a piece in our hand, then we
        // are attempting to pick up a piece at that square. Otherwise,
        // we are attempting to place a piece at that square.
        if (!pieceInHand) {
            handlePickupPiece(e, squareIndex, square)
        } else {
            handlePlacePiece(squareIndex, square)
        }
    };

    const ranksFiles = ranksAndFiles(playerColour);

    visualGame.split("").map((piece, i) => {
        const square = ranksFiles[i];
        const colour = piece === piece.toUpperCase() ? 'white' : 'black';
        const imagePath = `../assets/${colour}-pieces/${piece}.png`;

        squares.push(
            <img 
                className={styles.piece} 
                src={imagePath} 
                alt="../assets/white-pieces/X.png" 
                key={square} 
                onClick={(e) => handleClick(e, i, square)}
            />
        );
        return;
    })

    return <div className={styles.pieceBoard}>{squares}</div>;
};

export default PieceBoard;