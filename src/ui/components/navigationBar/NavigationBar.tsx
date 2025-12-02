import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewGameModal from './NewGameModal';
import { useState } from 'react';

const NavigationBar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chess
            </Typography>
            <Button color="inherit" onClick={() => setModalOpen(!modalOpen)}>New Game</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <NewGameModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

export default NavigationBar;