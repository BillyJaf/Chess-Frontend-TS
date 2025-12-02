import { useGame } from "../../context/GameContext";
import styles from "./PromotePawn.module.css"
import PromotePawnIcon from "./PromoteIcon";

const PromotePawn: React.FC = () => {
  const { promotionMove, currentGame } = useGame();
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