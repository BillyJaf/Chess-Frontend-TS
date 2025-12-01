export const fenGameToVisualGame = (fenGame: string): string => {
    return fenGame.replace(/\//g, "").replace(/\d/g, (digit) => "X".repeat(Number(digit)));
}

export const backend_gameover_to_frontend_gameover = (result: string | null) => {
    if (result == null) {
      return null
    } else if (result == 'White') {
        return 'w'
    } else if (result == 'Black') {
        return 'b'
    } else {
        return '-'
    }
}