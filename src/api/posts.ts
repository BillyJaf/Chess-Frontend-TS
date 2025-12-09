import type {
  best_move_response,
  legal_moves_response,
  OKResponse,
  validate_fen_response,
} from "./types";

export async function fetchBestMove(fen: string) {
  const response = await fetch(
      "https:///best_move", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fen),
  });

  // const response = await fetch("http://localhost:8080/best_move", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const ok_response = JSON.parse(data) as OKResponse;
  const parsedBestMoveResponse = ok_response.Ok as best_move_response;

  return parsedBestMoveResponse;
}

export async function fetchLegalMoves(fen: string) {
  const response = await fetch(
      "https:///legal_moves", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fen),
  });

  // const response = await fetch("http://localhost:8080/legal_moves", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const ok_response = JSON.parse(data) as OKResponse;
  const parsedLegalMovesResponse = ok_response.Ok as legal_moves_response;
  

  return parsedLegalMovesResponse;
}

export async function validateFEN(fen: string) {
  const response = await fetch(
      "https:///validate_fen", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fen),
  });

  // const response = await fetch("http://localhost:8080/validate_fen", {
  //   method: "Post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(fen),
  // });

  const data = await response.text();
  const ok_response = JSON.parse(data) as OKResponse;
  const parsedValidFen = ok_response.Ok as validate_fen_response;

  return parsedValidFen;
}
