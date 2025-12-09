import type {
  best_move_response,
  FenOutput,
  legal_moves_response,
  validate_fen_response,
} from "./types";

export async function fetchBestMove(fen: string) {
  const outboundFen: FenOutput = {
    fen: fen
  }
  
  const response = await fetch(
      "https:///best_move", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outboundFen),
  });

  // const response = await fetch("http://localhost:8080/best_move", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const parsedBestMoveResponse = JSON.parse(data) as best_move_response;

  return parsedBestMoveResponse;
}

export async function fetchLegalMoves(fen: string) {
  const outboundFen: FenOutput = {
    fen: fen
  }

  const response = await fetch(
      "https:///legal_moves", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outboundFen),
  });

  // const response = await fetch("http://localhost:8080/legal_moves", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const parsedLegalMovesResponse = JSON.parse(data) as legal_moves_response;
  

  return parsedLegalMovesResponse;
}

export async function validateFEN(fen: string) {
  const outboundFen: FenOutput = {
    fen: fen
  }

  const response = await fetch(
      "https:///validate_fen", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outboundFen),
  });

  // const response = await fetch("http://localhost:8080/validate_fen", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const parsedValidFen = JSON.parse(data) as validate_fen_response;

  return parsedValidFen;
}
