import React from "react";
import { Box, Typography } from "@mui/material";

interface Header {
  header: string;
}

const mainBoxStyle = {
  width: 240,
  height: 480,
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
    px: 8
}

const SidePanel: React.FC<Header> = ({ header } : Header) => {
  return (
    <Box sx={mainBoxStyle}>
      <Box sx={headerBoxStyle}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {header}
          </Typography>
      </Box>
    </Box>
  );
};

export default SidePanel;