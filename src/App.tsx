import './App.css'
import Board from './components/board/Board'
import GameOver from './components/gameOver/GameOver'
import SelectPiece from './components/mouse/SelectPiece'
import PromotePawn from './components/promote/PromotePawn'

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
