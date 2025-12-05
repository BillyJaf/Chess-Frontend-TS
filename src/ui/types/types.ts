export type LegalMoves = { [startSquare: string]: UIPossibleGameState[] };

export interface UICurrentGameState {
  gameOver: string | null;
  uciMove: string | null;
  fen: string;
  legalMoves: LegalMoves;
}

export interface UILegalMoves {
  gameOver: string | null;
  legalMoves: LegalMoves;
}

export interface UIPossibleGameState {
  endSquare: string;
  resultingFEN: string;
  gameOver: string | null;
}

export interface UIPieceInHand {
  piece: string; // Type of piece in FEN notation (i.e. p,P,b,B etc)
  pieceOrigin: string; // Where the piece we are holding came from (i.e. a1, h6 etc)
  piecePath: string; // Path of the piece image
  x: number;
  y: number;
}
