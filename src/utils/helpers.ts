export const fenGameToVisualGame = (fenGame: string): string => {
    return fenGame.replace(/\//g, "").replace(/\d/g, (digit) => "X".repeat(Number(digit)));
}