import { bestMoveResponseToUICurrentGameState } from "../../api/converters";
import { fetchBestMove } from "../../api/posts";
import type { UICurrentGameState } from "../types/types";

export async function makeBotMove(
  fen: string,
  setCurrentGameState: (gamestate: UICurrentGameState) => void,
) {
  const apiBestMove = await fetchBestMove(fen);
  const uiCurrentGameState = bestMoveResponseToUICurrentGameState(apiBestMove);
  console.log(uiCurrentGameState.sanMove);
  setCurrentGameState(uiCurrentGameState);
}
