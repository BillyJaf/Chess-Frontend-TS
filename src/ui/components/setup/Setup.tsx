import { Box, Modal } from "@mui/material";
import ColourSelector from "./components/ColourSelector";
import Start from "./components/Start";
import FenSelector from "./components/FenSelector";

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
    borderBottom: "1px solid grey"
}

const Setup: React.FC = () => {
  return (
    <Modal
        open={true}
        onClose={() => {}}
    >
        <Box sx={mainBoxStyle}>
            <Box
                sx={headerBoxStyle}
            >
                GAME SETTINGS
            </Box>
            <ColourSelector />
            <FenSelector />
            <Start />
        </Box>
    </Modal>
  );
};

export default Setup;