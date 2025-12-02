import Game from './ui/components/game/Game'
import NavigationBar from './ui/components/navigationBar/NavigationBar'
import { GameVisualsProvider } from './ui/context/GameVisualsContext'
import styles from "./App.module.css"
import { GameSettingsProvider } from './ui/context/GameSettingsContext'
import { ThemeProvider } from '@mui/material'
import theme from './ui/themes/Theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <GameSettingsProvider>
          <NavigationBar />
          <GameVisualsProvider>
            <Game />
          </GameVisualsProvider>
        </GameSettingsProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
