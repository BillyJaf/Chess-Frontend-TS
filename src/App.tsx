import './App.css'
import Board from './ui/components/board/Board'
import GameOver from './ui/components/gameOver/GameOver'
import SelectPiece from './ui/components/mouse/SelectPiece'
import PromotePawn from './ui/components/promote/PromotePawn'

function App() {
  return (
    <>
      <SelectPiece />
      <PromotePawn />
      <GameOver />
      <Board />
    </>
  )
}

export default App
