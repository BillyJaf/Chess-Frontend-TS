import Game from './ui/components/game/Game'
import NavigationBar from './ui/components/navigationBar/NavigationBar'
import { GameVisualsProvider } from './ui/context/GameVisualsContext'
import styles from "./App.module.css"
import { GameSettingsProvider } from './ui/context/GameSettingsContext'

function App() {
  return (
    <div className={styles.app}>
      <GameSettingsProvider>
        <NavigationBar />
        <GameVisualsProvider>
          <Game />
        </GameVisualsProvider>
      </GameSettingsProvider>
    </div>
  )
}

export default App
