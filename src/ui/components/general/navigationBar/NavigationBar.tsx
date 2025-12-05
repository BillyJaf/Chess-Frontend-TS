import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewGameModal from './NewGameModal';
import { useState } from 'react';

const buttonStyle = {
  outline: 'none',
  '&:focus': { outline: 'none' },
  '&:focus-visible': { outline: 'none' },
  '&:focus-within': { outline: 'none' },
};

const NavigationBar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chess
          </Typography>
          <Button color="inherit" onClick={() => setModalOpen(!modalOpen)} sx={buttonStyle}>
            New Game
          </Button>
        </Toolbar>
      </AppBar>
      <NewGameModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default NavigationBar;