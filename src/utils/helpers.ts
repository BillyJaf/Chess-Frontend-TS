export const fenStringToVisualGame = (fen: string, playerColour: string): string => {
    return fenGameToVisualGame(fen.split(" ")[0], playerColour);
}

const fenGameToVisualGame = (fenGame: string, playerColour: string): string => {
    let visualGame = fenGame.replace(/\//g, "").replace(/\d/g, (digit) => "X".repeat(Number(digit)))
    if (playerColour === 'Black') {
        visualGame = visualGame.split('').reverse().join('')
    }
    return visualGame;
}

export const validateCustomFen = (fen: string) => {
    if (fen === '') {
        return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    }
    return fen
}