// Returned type from backend
interface LegalMovesResponse {
    gameOver: string | null;
    moves: ResultingGameState[];
}

interface ResultingGameState {
    uciMove: string;
    resultingFEN: string;
    gameOver: string | null;
}

// Internal representation
interface LegalMovesInternal {
    gameOver: string | null;
    moves: {[key: string]: InternalGameState[]};
}

interface InternalGameState {
    endSquare: string;
    resultingFEN: string;
    gameOver: string | null;
}

export async function fetchLegalMoves(fen: string) {
    // const response = await fetch(
    //     "https://backend-chess-bot.fly.dev/legal_moves", {
    //     method: "Post",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(fen),
    // });

    const response = await fetch(
        "https://localhost:8080/legal_moves", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedLegalMovesResponse = JSON.parse(data) as LegalMovesResponse;

    const internalLegalMoves: {[key: string]: InternalGameState[]} = {}

    for (const { uciMove, gameOver } of parsedLegalMovesResponse.moves) {

        let startSquare = uciMove.slice(0, 2);
        let endSquare = uciMove.slice(2);
        
        if (startSquare in internalLegalMoves) {
            internalLegalMoves[startSquare].push( { endSquare, resultingFEN: fen, gameOver })
        } else {
            internalLegalMoves[startSquare] = [ { endSquare, resultingFEN: fen, gameOver } ]
        }
    }

    const parsedLegalMovesInternal: LegalMovesInternal = {
        ...parsedLegalMovesResponse,
        moves: internalLegalMoves
    }

    return parsedLegalMovesInternal
}

