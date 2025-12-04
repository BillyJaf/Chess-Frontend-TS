import Board from "./board/Board";
import GameOverModal from "./gameOver/GameOverModal";
import SelectPiece from "./mouse/SelectPiece";
import PromotePawn from "./promote/PromotePawn";

const Game: React.FC = () => {
  return ( 
    <>
      <SelectPiece />
      <PromotePawn />
      <GameOverModal />
      <Board />
    </>
  );
};

export default Game;