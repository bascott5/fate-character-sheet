import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";

const Stress: React.FC = () => {
    const [stress, setStress] = useState<boolean[]>([false]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: stress });
    }, [stress]);

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1>
            <button className="characterSheetButton" onClick={() => setStress([...stress, false])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stress.map((key, index) => (
                        <div>
                            <svg>
                                <rect className="stress" style={{ fill: key ? "red" : "white" }} height={25} width={25} x={ index + 1 } y={ 0 } onClick={() => setStress(stress => {
                                    const stressCopy = [...stress]
                                    stressCopy[index] = !stressCopy[index];
                                    return [...stressCopy];
                                })} />
                            </svg>
                        </div>
                    ))
                :
                    stress.map(key => (
                        <div>
                            { key }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stress;