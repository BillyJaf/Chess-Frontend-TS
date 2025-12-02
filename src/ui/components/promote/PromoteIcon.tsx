import { fenGameToVisualGame } from "../../../utils/helpers";
import { makeBotMove } from "../../../utils/makeBotMove";
import { useGame } from "../../context/GameContext";
import styles from "./PromoteIcon.module.css";

interface Piece {
    piece: string,
}

const PromotePawnIcon: React.FC<Piece> = ( { piece }: Piece ) => {
//   const { pieceInHand } = useGame();
//   const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

//   if (!pieceInHand || !pos) return null;
    const { legalMoves, setLegalMoves, setVisualGame, promotionMove, setPromotionMove, setGameOver } = useGame();

  const isWhite: boolean = piece === piece.toUpperCase();
  const imagePath: string = isWhite ? `../assets/white-pieces/${piece}.png` : `../assets/black-pieces/${piece}.png`;

  const handleClick = () => {
    const startSquareClicked = promotionMove!.slice(0,2)
    const endSquareClicked = promotionMove!.slice(2,4)
    setPromotionMove(null);
    let updatedFEN = "";
    let gameWinner = null;
    for (const { endSquare, resultingFEN, gameOver } of legalMoves[startSquareClicked]) {
        if (endSquare[2] == piece.toLowerCase() && endSquare.slice(0,2) == endSquareClicked) {
            updatedFEN = resultingFEN;
            gameWinner = gameOver;
            break;
        }
    }
    setVisualGame(fenGameToVisualGame(updatedFEN.split(" ")[0]))

    if (!!gameWinner) {
        setLegalMoves({})
        setGameOver(gameWinner)
    } else {
        makeBotMove(updatedFEN, setVisualGame, setLegalMoves, setGameOver)
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