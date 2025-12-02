import Board from "./board/Board";
import GameOver from "./gameOver/GameOver";
import SelectPiece from "./mouse/SelectPiece";
import PromotePawn from "./promote/PromotePawn";

const Game: React.FC = () => {
  return ( 
    <>
      <SelectPiece />
      <PromotePawn />
      <GameOver />
      <Board />
    </>
  );
};

export default Game;