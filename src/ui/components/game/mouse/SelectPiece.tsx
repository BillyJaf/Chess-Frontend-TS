import { useEffect, useState } from "react";
import { useGameVisuals } from "../../../context/GameVisualsContext";

const SelectPiece: React.FC = () => {
  const { visualPieceInHand } = useGameVisuals();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!visualPieceInHand) {
      setPos(null);
      return;
    }

    setPos({ x: visualPieceInHand.x, y: visualPieceInHand.y });

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    if (visualPieceInHand) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [visualPieceInHand]);

  if (!visualPieceInHand || !pos) return null;

  return (
    <img
      src={visualPieceInHand.piecePath}
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
