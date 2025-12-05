import { fenStringToVisualFen } from "../../../utils/helpers";
import { makeBotMove } from "../../../utils/makeBotMove";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { useGameVisuals } from "../../../context/GameVisualsContext";
import styles from "./PromoteIcon.module.css";

interface Piece {
    piece: string,
}

const PromotePawnIcon: React.FC<Piece> = ( { piece }: Piece ) => {
  const { visualLegalMoves, setVisualLegalMoves, setVisualFEN, visualPromotionMove, setVisualPromotionMove, setVisualGameOver } = useGameVisuals();
  const { playerColour, setCurrentGameState } = useGameSettings();

  const isWhite: boolean = piece === piece.toUpperCase();
  const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

  const handleClick = () => {
    const startSquareClicked = visualPromotionMove!.slice(0,2)
    const endSquareClicked = visualPromotionMove!.slice(2,4)
    setVisualPromotionMove(null);
    let updatedFEN = "";
    let gameWinner = null;
    for (const { endSquare, resultingFEN, gameOver } of visualLegalMoves[startSquareClicked]) {
        if (endSquare[2] == piece.toLowerCase() && endSquare.slice(0,2) == endSquareClicked) {
            updatedFEN = resultingFEN;
            gameWinner = gameOver;
            break;
        }
    }
    setVisualFEN(fenStringToVisualFen(updatedFEN, playerColour))

    if (gameWinner) {
        setVisualLegalMoves({})
        setVisualGameOver(gameWinner)
    } else {
        makeBotMove(updatedFEN, setCurrentGameState)
    }
  }

  return ( 
    <div className={styles.selectpiece}>
        <img
        src={imagePath}
        alt="../assets/white-pieces/X.png"
        style={{
            position: "relative",
            width: "100%",
            height: "100%",
        }}
        onClick={handleClick}
        />
    </div>
);
};

export default PromotePawnIcon;