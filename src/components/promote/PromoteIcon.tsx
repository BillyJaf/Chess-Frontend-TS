import { useGame } from "../../context/GameContext";
import { fenGameToVisualGame } from "../../utils/helpers";
import { makeBotMove } from "../../utils/makeBotMove";
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
    const startSquare = promotionMove!.slice(0,2)
    const endSquare = promotionMove!.slice(2,4)
    setPromotionMove(null);
    let resultingFen = "";
    for (const [end, fen] of legalMoves[startSquare]) {
        if (end[2] == piece.toLowerCase() && end.slice(0,2) == endSquare) {
            resultingFen = fen;
            break;
        }
    }
    setVisualGame(fenGameToVisualGame(resultingFen.split(" ")[0]))

    makeBotMove(resultingFen, setVisualGame, setLegalMoves, setGameOver)
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