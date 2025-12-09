import type { health_check_response } from "./types";

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
  const health_check = JSON.parse(data) as health_check_response;

  return health_check;
}
