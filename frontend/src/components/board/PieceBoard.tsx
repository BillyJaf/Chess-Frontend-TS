import React, { type JSX } from "react";
import styles from "./PieceBoard.module.css"
import { useGame } from "../../context/GameContext";
import type { PieceInHand } from "../../utils/types";

const PieceBoard: React.FC = () => {
    const squares: JSX.Element[] = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const { legalMoves, visualGame, setVisualGame, pieceInHand, setPieceInHand } = useGame();

    const handleClick = (e: React.MouseEvent, squareIndex: number, square: string) => {

        // We can only make legal moves.
        // If we are picking up a piece:
        if (!pieceInHand && !(square in legalMoves)) {
            return;
        }
        // If we are placing a piece:
        if (!!pieceInHand && !(legalMoves[pieceInHand.pieceOrigin].includes(square)) && square !== pieceInHand.pieceOrigin) {
            return;
        }

        const piece = visualGame.charAt(squareIndex);
        const isWhite: boolean = piece === piece.toUpperCase();
        const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

        // If we aren't holding a piece, then we want to place an empty square down.
        let currentlyHeldPiece: string = !!pieceInHand ? pieceInHand.piece : 'X';

        // Updated
        let update: PieceInHand | null = null;
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
        
        setPieceInHand(update);
        setVisualGame(visualGame.slice(0, squareIndex) + currentlyHeldPiece + visualGame.slice(squareIndex + 1))
    };

    visualGame.split("").map((piece, i) => {
        const file = files[i % 8];
        const rank = 8 - Math.floor(i / 8);
        const square = `${file}${rank}`;

        const isWhite: boolean = piece === piece.toUpperCase();
        const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

        squares.push(
            <img className={styles.piece} src={imagePath} alt="../assets/white-pieces/X.png" key={square} onClick={(e) => handleClick(e, i, square)}/>
        );
        return;
    })

    return <div className={styles.pieceBoard}>{squares}</div>;
};

export default PieceBoard;