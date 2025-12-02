import { TextField } from '@mui/material';

const FenSelector: React.FC = () => {
  return (
    <TextField
        id="outlined-FenSelector"
        label="Starting FEN String"
        defaultValue=""
        helperText="Default position if left empty."
    />
  );
};

export default FenSelector;