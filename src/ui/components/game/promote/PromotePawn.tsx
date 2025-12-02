import { useGameVisuals } from "../../../context/GameVisualsContext";
import styles from "./PromotePawn.module.css"
import PromotePawnIcon from "./PromoteIcon";

const PromotePawn: React.FC = () => {
  const { promotionMove, currentGame } = useGameVisuals();
  const whiteChoices = ['N', 'B', 'R', 'Q']
  const blackChoices = ['n', 'b', 'r', 'q']
  const choices = currentGame.activeColour == 'w' ? whiteChoices : blackChoices;

  return ( 
    !!promotionMove &&
    <div className={styles.promotepawn}> 
        {choices.map((piece) => {
            return <PromotePawnIcon piece={piece} key={piece}/>
        })}
    </div>
);
};

export default PromotePawn;