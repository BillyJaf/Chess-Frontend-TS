import { useEffect, useState } from "react";
import { useGameVisuals } from "../../../context/GameVisualsContext";

const SelectPiece: React.FC = () => {
  const { pieceInHand } = useGameVisuals();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!pieceInHand) {
      setPos(null);
      return;
    }

    setPos({ x: pieceInHand.x, y: pieceInHand.y });

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    if (pieceInHand) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pieceInHand]);

  if (!pieceInHand || !pos) return null;

  return (
    <img
      src={pieceInHand.piecePath}
      alt="../assets/white-pieces/X.png"
      style={{
        position: "fixed",
        left: pos.x - 30,
        top: pos.y - 30,
        width: "60px",
        height: "60px",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
};

export default SelectPiece;