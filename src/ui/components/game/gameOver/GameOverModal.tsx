import { Box, Button, Modal, Typography } from "@mui/material";
import { useGameSettings } from "../../../context/GameSettingsContext";
import { useGameVisuals } from "../../../context/GameVisualsContext";
import { startingGameState } from "../../../utils/constants";

const mainBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 100,
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

const buttonsBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 280
}

const GameOverModal: React.FC = () => {
  const { visualGameOver, setVisualGameOver } = useGameVisuals();
  const { setPlayerColour, setCurrentGameState, setFirstMove } = useGameSettings();

  let message = "Stalemate!";
  if (visualGameOver === 'Black') {
    message = "Black Wins!"
  } else if (visualGameOver === 'White') {
    message = "White Wins!"
  }

  const handlePlayAgain = () => {
    setPlayerColour('White');
    setCurrentGameState(startingGameState);
    setFirstMove(true);
  }

  const playAgain = (
    <Button variant="contained" onClick={handlePlayAgain}>Play Again</Button>
  );

  const reviewGame = (
    <Button variant="contained" onClick={() => setVisualGameOver(null)}>View Board</Button>
  );



  return (
    <Modal
        open={!!visualGameOver}
        onClose={() => {}}
    >
        <Box sx={mainBoxStyle}>
            <Box sx={headerBoxStyle}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {message}
                </Typography>
            </Box>
            <Box sx={buttonsBoxStyle}>
                {playAgain}
                {reviewGame}
            </Box>
        </Box>
    </Modal>
  );
};

export default GameOverModal;