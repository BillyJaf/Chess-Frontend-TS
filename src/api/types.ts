export interface best_move_response {
  game_over: string | null;
  uci_move: string;
  resulting_fen: string;
  resulting_legal_moves: ResultingGameState[];
}

export interface legal_moves_response {
  game_over: string | null;
  legal_moves: ResultingGameState[];
}

export interface ResultingGameState {
  uci_move: string;
  resulting_fen: string;
  game_over: string | null;
}
