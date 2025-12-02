import { useGameVisuals } from "../../../context/GameVisualsContext";
import styles from "./GameOver.module.css"

const GameOver: React.FC = () => {
  const { gameOver } = useGameVisuals();

  let message = "Stalemate!";
  if (gameOver === 'Black') {
    message = "Black Wins!"
  } else if (gameOver === 'White') {
    message = "White Wins!"
  }

  return ( 
    !!gameOver &&
    <div className={styles.gameover}> 
        {message}
    </div>
);
};

export default GameOver;