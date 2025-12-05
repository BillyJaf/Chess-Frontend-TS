import Board from "./board/Board";
import GameOverModal from "./gameOver/GameOverModal";
import SelectPiece from "./mouse/SelectPiece";
import SidePanel from "./sidePanel/SidePanel";
import styles from "./Game.module.css";
import PromoteModal from "./promote/PromoteModal";

const Game: React.FC = () => {
  return (
    <>
      <SelectPiece />
      <PromoteModal />
      <GameOverModal />
      <div className={styles.boardHolder}>
        <SidePanel header={"Player"} />
        <Board />
        <SidePanel header={"Bot"} />
      </div>
    </>
  );
};

export default Game;
