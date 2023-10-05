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
                <div style={{ backgroundColor: "white", position: "absolute", margin: "0 0 auto", padding: "15px 100px 15px 25px", borderRadius: "5px", top: "40%", left: "41%", zIndex: rolling ? 5 : 2 }}>
                    <h1 style={{ fontFamily: "sans-serif", color: context.theme.color }}>Insert Bonus</h1>
                    <input className="input" style={{ color: context.theme.color, width: "200px", fontSize: "25px" }} type="number" value={ bonus } onChange={(e) => setBonus(e.target.valueAsNumber)}/>
                    <button className="button" style={{ backgroundColor: context.theme.color, right: -80 }} onClick={() => {
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
                <div style={{ position: "fixed", right: 30, top: 750, display: "flex", flexDirection: "column" }}>
                    {rolled ? (
                        <div>
                            <p style={{ flex: "0", position: "relative", color: context.theme.color, backgroundColor: "white", outlineColor: "black", padding: "25px 0px 25px 0px", margin: "0px 0px 25px 0px", borderRadius: "10px", border: "1px solid dimgrey", textAlign: "center", fontSize: "25px", fontFamily: "sans-serif" }} placeholder="">{ context.dice.currentRoll }</p>
                        </div>
                    ) : null}
                    <button style={{ flex: "0", position: "relative", margin: rolled ? "0px 25px 0px 25px" : "107px 25px 0px 25px", padding: "5px", width: "50px" }} onClick={() => {
                        setBonus(0);
                        isRolling(true);
                    }}>Roll!</button>
                </div>
            </div>
        </div>
    );
}

export default Dice;