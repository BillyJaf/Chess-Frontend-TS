import { Box, Button, IconButton, Modal, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { fenStringToVisualFen, validateCustomFen } from "../../../utils/helpers";
import { startingGameState } from "../../../utils/constants";
import { useGameVisuals } from "../../../context/GameVisualsContext";
import styles from "./PromoteModal.module.css"
import { makeBotMove } from "../../../utils/makeBotMove";

const mainBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  height: 140,
  bgcolor: 'white',
  border: '2px solid black',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 5,
  outline: 'none',
};

const headerBoxStyle = {
    fontSize: 20,
    fontWeight: 600,
    pb: 1,
    borderBottom: "1px solid grey",
    px: 4
}

const buttonStyle = {
  outline: 'none',
  '&:focus': { outline: 'none' },
  '&:focus-visible': { outline: 'none' },
  '&:focus-within': { outline: 'none' },
};

const PromoteModal: React.FC = () => {
  const { playerColour, currentGameState, setCurrentGameState } = useGameSettings();
  const { visualPromotionMove, visualLegalMoves, setVisualLegalMoves, setVisualGameOver, setVisualPromotionMove, setVisualFEN } = useGameVisuals();
  const pieces = playerColour === 'White' ? 
    {knight: 'N', bishop: 'B', rook: 'R', queen: 'Q'} : 
    {knight: 'n', bishop: 'b', rook: 'r', queen: 'q'};
  const imagePathColour = playerColour.toLowerCase();

  const handlePromote = (piece: string) => {
      const startSquareClicked = visualPromotionMove!.slice(0,2)
      const endSquareClicked = visualPromotionMove!.slice(2,4)
      setVisualPromotionMove(null);
      let updatedFEN = "";
      let gameWinner = null;
      for (const { endSquare, resultingFEN, gameOver } of visualLegalMoves[startSquareClicked]) {
          if (endSquare[2] == piece.toLowerCase() && endSquare.slice(0,2) == endSquareClicked) {
              updatedFEN = resultingFEN;
              gameWinner = gameOver;
              break;
          }
      }
      setVisualFEN(fenStringToVisualFen(updatedFEN, playerColour))
  
      if (gameWinner) {
          setVisualLegalMoves({})
          setVisualGameOver(gameWinner)
      } else {
          makeBotMove(updatedFEN, setCurrentGameState)
      }
    }

  const handleModalClose = () => {
    setVisualPromotionMove(null);
    setVisualFEN(fenStringToVisualFen(currentGameState.fen, playerColour))
  }

  const knightButton = (
    <IconButton sx={buttonStyle} onClick={() => handlePromote(pieces.knight)}>
      <img 
        className={styles.piece} 
        src={`../assets/${imagePathColour}-pieces/${pieces.knight}.png`} 
        alt={"../assets/white-pieces/X.png"}
      />
    </IconButton>
  )

  const bishopButton = (
    <IconButton sx={buttonStyle} onClick={() => handlePromote(pieces.bishop)}>
      <img 
        className={styles.piece} 
        src={`../assets/${imagePathColour}-pieces/${pieces.bishop}.png`} 
        alt={"../assets/white-pieces/X.png"}
      />
    </IconButton>
  )

  const rookButton = (
    <IconButton sx={buttonStyle} onClick={() => handlePromote(pieces.rook)}>
      <img 
        className={styles.piece} 
        src={`../assets/${imagePathColour}-pieces/${pieces.rook}.png`} 
        alt={"../assets/white-pieces/X.png"}
      />
    </IconButton>
  )

  const queenButton = (
    <IconButton sx={buttonStyle} onClick={() => handlePromote(pieces.queen)}>
      <img 
        className={styles.piece} 
        src={`../assets/${imagePathColour}-pieces/${pieces.queen}.png`} 
        alt={"../assets/white-pieces/X.png"}
      />
    </IconButton>
  )

  return (
    <Modal
        open={!!visualPromotionMove}
        onClose={handleModalClose}
    >
        <Box sx={mainBoxStyle}>
            <Box sx={headerBoxStyle}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Promote Pawn To:
                </Typography>
            </Box>
            <div className={styles.buttonBox}>
                {knightButton}
                {bishopButton}
                {rookButton}
                {queenButton}
            </div>
        </Box>
    </Modal>
  );
};

export default PromoteModal;