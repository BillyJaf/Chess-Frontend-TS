// Returned type from backend
interface LegalMovesResponse {
    winner: string | null;
    stalemate: boolean;
    moves: [string, string][];
}

// Internal representation
interface LegalMovesInternal {
    winner: string | null;
    stalemate: boolean;
    moves: {[key: string]: [string, string][]};
}

export async function fetchLegalMoves(fen: string) {
    const response = await fetch(
        "http://localhost:3600/legal_moves", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fen),
    });

    const data = await response.text();
    const parsedLegalMovesResponse = JSON.parse(data) as LegalMovesResponse;

    const internalLegalMoves: {[key: string]: [string, string][]} = {}

    for (const [UCImove, fen] of parsedLegalMovesResponse.moves) {
        let startSquare = UCImove.slice(0, 2);
        let endSquare = UCImove.slice(2, 4);
        
        if (startSquare in internalLegalMoves) {
            internalLegalMoves[startSquare].push([endSquare, fen])
        } else {
            internalLegalMoves[startSquare] = [[endSquare, fen]]
        }
    }

    const parsedLegalMovesInternal: LegalMovesInternal = {
        ...parsedLegalMovesResponse,
        moves: internalLegalMoves
    }

    return parsedLegalMovesInternal
}

