import type { LegalMoves, UICurrentGameState } from "../types/types";

export const startingPosition: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const startingLegalMoves: LegalMoves = {
  a2: [
    {
      endSquare: "a3",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "a4",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  b2: [
    {
      endSquare: "b3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "b4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  c2: [
    {
      endSquare: "c3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "c4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  d2: [
    {
      endSquare: "d3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/3P4/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "d4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  e2: [
    {
      endSquare: "e3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "e4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  f2: [
    {
      endSquare: "f3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "f4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  g2: [
    {
      endSquare: "g3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "g4",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  h2: [
    {
      endSquare: "h3",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
    {
      endSquare: "h4",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPP1/RNBQKBNR b KQkq - 0 1",
      gameOver: null,
    },
  ],
  b1: [
    {
      endSquare: "a3",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/8/N7/PPPPPPPP/R1BQKBNR b KQkq - 1 1",
      gameOver: null,
    },
    {
      endSquare: "c3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR b KQkq - 1 1",
      gameOver: null,
    },
  ],
  g1: [
    {
      endSquare: "f3",
      resultingFEN:
        "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
      gameOver: null,
    },
    {
      endSquare: "h3",
      resultingFEN: "rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
      gameOver: null,
    },
  ],
};

// export const startingGameState: UICurrentGameState = {
//     gameOver: null,
//     uciMove: null,
//     fen: startingPosition,
//     legalMoves: startingLegalMoves,
// }

export const startingGameState: UICurrentGameState = {
  gameOver: null,
  uciMove: null,
  fen: startingPosition,
  legalMoves: {},
};
