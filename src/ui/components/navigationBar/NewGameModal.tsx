import { Box, Button, Modal, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useGameSettings } from "../../context/GameSettingsContext";
import { validateCustomFen } from "../../../utils/helpers";

const mainBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 240,
  height: 320,
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

interface ModalOpen {
  modalOpen: boolean,
  setModalOpen: (modalOpen: boolean) => void,
}

const NewGameModal: React.FC<ModalOpen> = ( { modalOpen, setModalOpen }: ModalOpen ) => {
  const { setPlayerColour, setStartingFEN, resetCounter, setResetCounter } = useGameSettings();

  const [selectedWhite, setSelectedWhite] = useState<boolean>(true);
  const [customFEN, setCustomFEN] = useState<string>('');

  const selectedPlayerColour = selectedWhite ? 'White' : 'Black';

  const handleStartGame = () => {
    setStartingFEN(validateCustomFen(customFEN))
    setPlayerColour(selectedPlayerColour)
    setResetCounter(resetCounter + 1)
    setModalOpen(false)
  }
  
  const playerColourSelector = (
    <ToggleButtonGroup
        color="primary"
        value={selectedPlayerColour}
        exclusive
        onChange={() => setSelectedWhite(!selectedWhite)}
        aria-label="Platform"
    >
        <ToggleButton value="White">White</ToggleButton>
        <ToggleButton value="Black">Black</ToggleButton>
    </ToggleButtonGroup>
  );

  const customFENSelector = (
    <TextField
        id="outlined-FenSelector"
        label="Starting FEN String"
        defaultValue=""
        helperText="Leave empty for default game."
        onChange={(event) => setCustomFEN(event.target.value)}
    />
  );

  const startGame = (
    <Button variant="contained" onClick={handleStartGame}>Start Game</Button>
  );



  return (
    <Modal
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
    >
        <Box sx={mainBoxStyle}>
            <Box sx={headerBoxStyle}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Game Settings
                </Typography>
            </Box>
            {playerColourSelector}
            {customFENSelector}
            {startGame}
        </Box>
    </Modal>
  );
};

export default NewGameModal;