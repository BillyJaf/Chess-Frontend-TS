import { fetchBestMove } from "./bestMoveFetcher";
import { backend_gameover_to_frontend_gameover, fenGameToVisualGame } from "./helpers";

export async function makeBotMove(fen: string, setVisualGame: (fenGame: string) => void, setLegalMoves: (legalMoves: {
    [key: string]: [string, string][];
}) => void, setGameOver: (gameOver: string) => void) {
    const botMove = await fetchBestMove(fen);
    const gameOver = backend_gameover_to_frontend_gameover(botMove.gameOver)

    if (!gameOver) {
        const legal_moves = botMove.moves
        setVisualGame(fenGameToVisualGame(botMove.resulting_fen.split(" ")[0]))

        setLegalMoves(legal_moves)
    } else {
        setLegalMoves({})
        setGameOver(gameOver)
    }
}