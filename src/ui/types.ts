export interface UIBestMove {
    gameOver: string | null;
    uciMove: string;
    resultingFEN: string,
    resultingLegalMoves: {[startSquare: string]: UIPossibleGameState[]};
}

export interface UILegalMoves {
    gameOver: string | null;
    legalMoves: {[startSquare: string]: UIPossibleGameState[]};
}

export interface UIPossibleGameState {
    endSquare: string;
    resultingFEN: string;
    gameOver: string | null;
}

export class UIGameState {
    // Mandatory FEN string parts:
    fenGame: string;
    activeColour: string;
    canWhiteCastleKingSide: boolean = false;
    canWhiteCastleQueenSide: boolean = false;
    canBlackCastleKingSide: boolean = false;
    canBlackCastleQueenSide: boolean = false;
    enPassantSquare: string;
    halfMoves: number;
    fullMoves: number;

    constructor(fenString: string) {
        const components = fenString.trim().split(" ");

        if (components.length !== 6) {
            throw new Error("Invalid Number of fen Components: " + fenString);
        }
        this.fenGame = components[0];
        this.activeColour = components[1];
        this.canWhiteCastleKingSide = components[2].includes('K');
        this.canWhiteCastleQueenSide = components[2].includes('Q');
        this.canBlackCastleKingSide = components[2].includes('k');
        this.canBlackCastleQueenSide = components[2].includes('q');
        this.enPassantSquare = components[3];
        this.halfMoves = parseInt(components[4]);
        this.fullMoves = parseInt(components[5]);
    }
}

export interface UIPieceInHand {
    piece: string; // Type of piece in FEN notation (i.e. p,P,b,B etc)
    pieceOrigin: string; // Where the piece we are holding came from (i.e. a1, h6 etc)
    piecePath: string; // Path of the piece image
    x: number;
    y: number;
}

export type AppMode = "setup" | "playing";