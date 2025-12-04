import Board from "./board/Board";
import GameOverModal from "./gameOver/GameOverModal";
import SelectPiece from "./mouse/SelectPiece";
import PromotePawn from "./promote/PromotePawn";
import SidePanel from "./sidePanel/SidePanel";
import styles from "./Game.module.css"

const Game: React.FC = () => {
  return ( 
    <>
      <SelectPiece />
      <PromotePawn />
      <GameOverModal />
      <div className={styles.boardHolder}>
        <SidePanel header={'Player'}/>
        <Board />
        <SidePanel header={'Bot'}/>
      </ div>
    </>
  );
};

export default Game;