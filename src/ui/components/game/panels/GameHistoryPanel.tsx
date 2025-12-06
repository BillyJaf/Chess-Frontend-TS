import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useGameSettings } from "../../../context/GameSettingsContext";
import styles from "./GameHistoryPanel.module.css"

const mainBoxStyle = {
  width: 240,
  height: 480,
  bgcolor: "white",
  border: "2px solid black",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 5,
  outline: "none",
};

const headerBoxStyle = {
  fontSize: 20,
  fontWeight: 600,
  pb: 1,
  borderBottom: "1px solid grey",
  px: 4,
};

const buttonStyle = {
  outline: "none",
  "&:focus": { outline: "none" },
  "&:focus-visible": { outline: "none" },
  "&:focus-within": { outline: "none" },
};

const GameHistoryPanel: React.FC = () => {
  const { gameHistory, currentGameState } = useGameSettings();

  let indexedHistory = []
  let index = 1;

  if (gameHistory.length % 2 === 0) {
    for (let i = 0; i < gameHistory.length; i += 2) {
      indexedHistory.push(index.toString() + ":");
      indexedHistory.push(gameHistory[i]);
      indexedHistory.push(gameHistory[i+1]);
      index += 1
    }
  } else {
    for (let i = 0; i < gameHistory.length - 2; i += 2) {
      indexedHistory.push(index.toString() + ":");
      indexedHistory.push(gameHistory[i]);
      indexedHistory.push(gameHistory[i+1]);
      index += 1
    }
    indexedHistory.push(index.toString() + ":");
    indexedHistory.push(gameHistory[gameHistory.length - 1]);
  }

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(currentGameState.fen);
    } catch (_) {
      return;
    }
  }
  
  const copyFEN = (
    <Button variant="contained" sx={buttonStyle} onClick={handleClick}>
      Copy Current GameState
    </Button>
  );

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Moves Made
        </Typography>
      </Box>
      <div className={styles.historyPanel}>
        {indexedHistory.map((indexOrMove, i) => {
          const indexCell = i % 3 === 0;
          return indexCell ? <div className={styles.indexCell}>{indexOrMove}</div> : 
                            <div className={styles.historyCell}>{indexOrMove}</div>
        })}
      </div>
      <div className={styles.copyFenBox}>
        {copyFEN}
      </div>
    </Box>
  );
};

export default GameHistoryPanel;
