import { useGame } from "../../context/GameContext";
import styles from "./GameOver.module.css"

const GameOver: React.FC = () => {
  const { gameOver } = useGame();

  let message = "Stalemate!";
  if (gameOver == "b") {
    message = "White Wins!"
  } else {
    message = "Black Wins!"
  }

  return ( 
    !!gameOver &&
    <div className={styles.gameover}> 
        {message}
    </div>
);
};

export default GameOver;