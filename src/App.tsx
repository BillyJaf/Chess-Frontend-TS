import { useState } from 'react'
import './App.css'
import type { AppMode } from './ui/types'
import Game from './ui/components/game/Game'
import Setup from './ui/components/setup/Setup'

function App() {
  return (
    <>
      <Setup />
      <Game />
    </>
  )
}

export default App
