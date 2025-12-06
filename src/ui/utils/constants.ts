import type { UICurrentGameState } from "../types/types";

export const startingPosition: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const startingGameState: UICurrentGameState = {
  gameOver: null,
  uciMove: null,
  sanMove: null,
  fen: startingPosition,
  legalMoves: {},
};
