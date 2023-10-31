import React from "react";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context-provider";
import Image from "next/image";
import bluedice from "../images/bluedice.svg";
import reddice from "../images/reddice.svg";
import purpledice from "../images/purpledice.svg";

interface PropTypes {
    children: JSX.Element
}

const Dice: React.FC = () => {
    const [rolled, isRolled] = useState(false);
    const [rolling, isRolling] = useState(false);
    const [timer, setTimer] = useState(5000);
    const [bonus, setBonus] = useState(0);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        let time = setTimeout(() => {}, 0);
        setTimer(0);

        if (timer !== 0) {
            isRolled(true);
            setTimer(2500);
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
            <div className={rolling ? "overlay" : ""} />
            {rolling ? (
                <div className="overlayContent" style={{ zIndex: rolling ? 5 : 2 }}>
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
                <div style={{ position: "fixed", right: 30, top: 750, display: "flex", flexDirection: "column" }}>
                    {rolled ? (
                        <div>
                            <p style={{ flex: "0", position: "relative", color: context.theme.color, backgroundColor: "white", outlineColor: "black", padding: "25px 0px 25px 0px", margin: "10px 0px 5px 0px", borderRadius: "10px", border: "1px solid dimgrey", textAlign: "center", fontSize: "25px", fontFamily: "sans-serif" }} placeholder="">{ context.dice.currentRoll }</p>
                        </div>
                    ) : null}
                    <Image 
                        priority
                        loading="eager"
                        className="dice"
                        style={{ margin: rolled ? "0px 25px 0px 25px" : "97px 25px 0px 25px" }}
                        src={
                            context.theme.theme == "Blue" ? bluedice :
                            context.theme.theme == "Red" ? reddice :
                            context.theme.theme == "Purple" ? purpledice :
                            null
                        }
                        alt="Roll!"
                        width={40}
                        height={40}
                        onClick={() => {
                            setBonus(0);
                            isRolling(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dice;