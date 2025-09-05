import React from "react";
import PieceBoard from "./PieceBoard";
import TileBoard from "./TileBoard";
import styles from "./Board.module.css"

const Board: React.FC = () => {
  return <div className={styles.board}>
    <TileBoard />
    <PieceBoard />
  </div>;
};

export default Board;