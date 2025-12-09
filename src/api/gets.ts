import type { health_check_response, OKResponse } from "./types";

export async function healthCheck() {
  const response = await fetch(
      "https:///health_check", {
      method: "Get",
      headers: { "Content-Type": "application/json" },
  });

//   const response = await fetch("http://localhost:8080/health_check", {
//     method: "Get",
//     headers: { "Content-Type": "application/json" },
//   });

  const data = await response.text();
  const ok_response = JSON.parse(data) as OKResponse;
  const health_check = ok_response.Ok as health_check_response;

  return health_check;
}
