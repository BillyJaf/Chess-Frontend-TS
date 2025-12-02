import Game from './ui/components/game/Game'
import NavigationBar from './ui/components/navigationBar/NavigationBar'
import Setup from './ui/components/setup/Setup'
import { GameProvider } from './ui/context/GameContext'
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <NavigationBar />
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  )
}

export default App
