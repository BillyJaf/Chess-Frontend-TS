import React from "react";
import { Box, Typography } from "@mui/material";
import { useGameSettings } from "../../../context/GameSettingsContext";
import styles from "./SidePanel.module.css";

interface Header {
  header: string;
}

const mainBoxStyle = {
  width: 240,
  height: 480,
  bgcolor: "white",
  border: "2px solid black",
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 5,
  outline: "none",
};

const headerBoxStyle = {
  fontSize: 20,
  fontWeight: 600,
  pb: 1,
  borderBottom: "1px solid grey",
  px: 8,
};

const SidePanel: React.FC<Header> = ({ header }: Header) => {
  const { playerColour, currentGameState } = useGameSettings();

  const currentFenBoard = currentGameState.fen.split(" ")[0];

  const whitePiecesDefault: { [piece: string]: number } = {
    P: 8,
    N: 2,
    B: 2,
    R: 2,
    Q: 1,
    K: 1,
  };
  const whitePieces: { [piece: string]: number } = {
    P: 8,
    N: 2,
    B: 2,
    R: 2,
    Q: 1,
    K: 1,
  };
  const blackPiecesDefault: { [piece: string]: number } = {
    p: 8,
    n: 2,
    b: 2,
    r: 2,
    q: 1,
    k: 1,
  };
  const blackPieces: { [piece: string]: number } = {
    p: 8,
    n: 2,
    b: 2,
    r: 2,
    q: 1,
    k: 1,
  };

  const displayWhitePieces =
    (playerColour === "White" && header === "Player") ||
    (playerColour === "Black" && header === "Bot");

  let defaultPieces = displayWhitePieces
    ? whitePiecesDefault
    : blackPiecesDefault;
  let pieces = displayWhitePieces ? whitePieces : blackPieces;

  currentFenBoard.split("").map((piece) => {
    if (piece in pieces && pieces[piece] > 0) {
      pieces[piece] -= 1;
    }
  });

  let squares = [];
  let keyIndex = 0;

  for (const [piece, count] of Object.entries(pieces)) {
    const remainder = defaultPieces[piece] - count;
    const colour = piece === piece.toUpperCase() ? "white" : "black";
    const imagePath = `../assets/${colour}-pieces/${piece}.png`;

    for (let i = 0; i < count; i++) {
      squares.push(
        <img
          key={`${colour}-captured-piece-${keyIndex}`}
          className={styles.piece}
          src={imagePath}
          alt="../assets/white-pieces/X.png"
        />,
      );
      keyIndex++;
    }

    for (let i = 0; i < remainder; i++) {
      squares.push(
        <img
          key={`${colour}-captured-piece-${keyIndex}`}
          className={styles.piece}
          src={"../assets/white-pieces/X.png"}
        />,
      );
      keyIndex++;
    }
  }

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {header}
        </Typography>
      </Box>
      <div className={styles.capturedPieces}>{squares}</div>
    </Box>
  );
};

export default SidePanel;
