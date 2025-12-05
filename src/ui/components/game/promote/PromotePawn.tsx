import { useGameVisuals } from "../../../context/GameVisualsContext";
import styles from "./PromotePawn.module.css"
import PromotePawnIcon from "./PromoteIcon";
import { useGameSettings } from "../../../context/GameSettingsContext";

const PromotePawn: React.FC = () => {
  const { visualPromotionMove } = useGameVisuals();
  const { playerColour } = useGameSettings();
  const whiteChoices = ['N', 'B', 'R', 'Q']
  const blackChoices = ['n', 'b', 'r', 'q']
  const choices = playerColour === 'White' ? whiteChoices : blackChoices;

  return ( 
    !!visualPromotionMove &&
    <div className={styles.promotepawn}> 
        {choices.map((piece) => {
            return <PromotePawnIcon piece={piece} key={piece}/>
        })}
    </div>
);
};

export default PromotePawn;