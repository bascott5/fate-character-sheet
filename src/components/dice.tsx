import { useContext, useEffect, useState } from "react";
import { Context } from "./context-provider";

interface PropTypes {
    children: JSX.Element
}

const Dice: React.FC = ({ children }: PropTypes) => {
    const [rolled, isRolled] = useState(false);
    const [rolling, isRolling] = useState(false);
    const [timer, setTimer] = useState(5000);
    const [bonus, setBonus] = useState(0);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        let time;
        setTimer(0);

        if (timer !== 0) {
            isRolled(true);
            setTimer(5000);
            time = setTimeout(() => isRolled(false), 5000); 
        }

        return () => clearTimeout(time);
    }, [timer]);

    const roll = (modifier: number, bonus: number) => {
        let container: number[] = [];
        let rng: number = 0

        for (let i = 0; i < 4; i++) {
            rng = Math.floor(Math.random() * 3) + 1;
            switch (rng) {
                case 1:
                    container.push(-1);
                    break;
    
                case 2:
                    container.push(0);
                    break;
    
                case 3:
                    container.push(1);
                    break;
    
                default:
                    console.log(container)
                    return [...container];
            }
        }

        return container.reduce((sum, num) => sum + num) + modifier + bonus;
    }

    return (
        <div>
            <div style={rolling ? { backgroundColor: "rgba(0, 0, 0, 0.5)", position: "fixed", width: "100%", height: "100%", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 } : null} />
            {rolling ? (
                <div style={{ position: "absolute", margin: "0 0 auto", top: "45%", left: "45%", zIndex: rolling ? 5 : 2 }}>
                    <input type="number" value={ bonus } onChange={(e) => setBonus(e.target.valueAsNumber)}/>
                    <button onClick={() => {
                        isRolling(false);
                        dispatch({
                            type: "SET CURRENT ROLL",
                            payload: roll(context.dice.modifier, bonus)
                        })
                        setTimer(Date.now());
                    }}>Roll!</button>
                </div>
            ) : null}
            <div >
                <div>
                    { children }
                </div>
                <div>
                    {rolled ? (
                        <div>
                            <p style={{ position: "fixed", right: 63, bottom: 70 }} placeholder="">{ context.dice.currentRoll }</p>
                        </div>
                    ) : null}
                    <button style={{ position: "fixed", right: 50, bottom: 50 }} onClick={() => {
                        setBonus(0);
                        isRolling(true);
                    }}>Roll!</button>
                </div>
            </div>
        </div>
    );
}

export default Dice;