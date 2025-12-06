import Board from "./board/Board";
import GameOverModal from "./gameOver/GameOverModal";
import SelectPiece from "./mouse/SelectPiece";
import CapturedPiecePanel from "./panels/CapturedPiecePanel";
import styles from "./Game.module.css";
import PromoteModal from "./promote/PromoteModal";
import GameHistoryPanel from "./panels/GameHistoryPanel";

const Game: React.FC = () => {
  return (
    <>
      <SelectPiece />
      <PromoteModal />
      <GameOverModal />
      <div className={styles.boardHolder}>
        <div className={styles.capturedPieceHolder}>
          <CapturedPiecePanel header={"Player"} />
          <CapturedPiecePanel header={"Bot"} />
        </div>
        <Board />
        <GameHistoryPanel />
      </div>
    </>
  );
};

export default Game;
