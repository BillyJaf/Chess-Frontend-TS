import React, { type JSX } from "react";
import styles from "./PieceBoard.module.css"
import { useGame } from "../../../context/GameContext";
import type { UIPieceInHand } from "../../../types";
import { fenGameToVisualGame } from "../../../../utils/helpers";
import { makeBotMove } from "../../../../utils/makeBotMove";

const PieceBoard: React.FC = () => {
    const squares: JSX.Element[] = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const { legalMoves, setLegalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand, setPromotionMove, gameOver, setGameOver } = useGame();

    const handleClick = (e: React.MouseEvent, squareIndex: number, square: string) => {
        // Picking up a piece:


        // We can only make legal moves.
        // If we are picking up a piece:
        if (!pieceInHand && !(square in legalMoves)) {
            return;
        }
        // If we are placing a piece:
        if (!!pieceInHand && square !== pieceInHand.pieceOrigin) {
            let validSquare = false;
            for (const { endSquare } of legalMoves[pieceInHand.pieceOrigin]) {
                if (endSquare.slice(0,2) === square) {
                    validSquare = true;
                }
            }
            if (!validSquare) {
                return;
            }
        }

        const piece = visualGame.charAt(squareIndex);
        const isWhite: boolean = piece === piece.toUpperCase();
        const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

        // If we aren't holding a piece, then we want to place an empty square down.
        let currentlyHeldPiece: string = !!pieceInHand ? pieceInHand.piece : 'X';

        // Updated
        let update: UIPieceInHand | null = null;
        // If we are picking up a piece:
        if (currentlyHeldPiece === 'X') {
            update = {
                piecePath: imagePath,
                piece: piece,
                pieceOrigin: square,
                x: e.clientX,
                y: e.clientY,
            };
        } 
        // Otherwise we are placing a piece:
        else {
            if (square !== pieceInHand!.pieceOrigin) {
                for (const { endSquare, resultingFEN, gameOver } of legalMoves[pieceInHand!.pieceOrigin]) {
                    if (endSquare.slice(0,2) === square) {
                        // Normal piece move (not pawn promotion):
                        if (endSquare.length == 2) {
                            const resultingFen = resultingFEN;
                            setPieceInHand(null)
                            setVisualGame(fenGameToVisualGame(resultingFen.split(" ")[0]))
                            setLegalMoves({})
                            if (!!gameOver) {
                                setGameOver(gameOver)
                            } else {
                                makeBotMove(resultingFen, setVisualGame, setLegalMoves, setGameOver)
                            }
                            return;
                        } else {
                            // We are promoting a pawn:
                            setPieceInHand(update)
                            setVisualGame(visualGame.slice(0, squareIndex) + currentlyHeldPiece + visualGame.slice(squareIndex + 1))

                            setPromotionMove(pieceInHand!.pieceOrigin + endSquare);

                            return;
                        }
                    }
                }
            } 
        }

        setPieceInHand(update)
        setVisualGame(visualGame.slice(0, squareIndex) + currentlyHeldPiece + visualGame.slice(squareIndex + 1))
    };

    visualGame.split("").map((piece, i) => {
        const file = files[i % 8];
        const rank = 8 - Math.floor(i / 8);
        const square = `${file}${rank}`;

        const isWhite: boolean = piece === piece.toUpperCase();
        const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

        squares.push(
            <img className={!!gameOver ? styles.pieceGameOver : styles.piece} src={imagePath} alt="../assets/white-pieces/X.png" key={square} onClick={(e) => handleClick(e, i, square)}/>
        );
        return;
    })

    return <div className={styles.pieceBoard}>{squares}</div>;
};

export default PieceBoard;