//TODO: turn altering key.boxes into a function so it can be more easily understood which box is being referred to by the computer
import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";

interface Stress {
    label: string
    boxes: boolean[]
}

const Stress: React.FC = () => {
    const [stress, setStress] = useState<Array<Stress>>([{
            label: "",
            boxes: [false]
        }]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: stress });
    }, [stress]);

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1>
            <button className="characterSheetButton" onClick={() => setStress([...stress, { label: "", boxes: [false] }])}>+blocks</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stress.map((key: Stress, index1: number) => (
                        <div>
                            <input type="text" value={ key.label } />
                            {key.boxes.map((box: boolean, index2: number) => (
                                <div>
                                    <svg>
                                        <rect className="stress" style={{ fill: box ? "red" : "white" }} height={25} width={25} onClick={() => setStress(stress.map((key, index) => ({...stress[index1], boxes: [...key.boxes].map(box => (key.boxes[index2] ? !box : box))})))} />
                                    </svg>
                                </div>
                            ))}
                            <button onClick={() => setStress(stress.map((key, index) => ({...stress[index], boxes: [...key.boxes, false]})))}>+block</button>
                        </div>
                    ))
                :
                    stress.map(key => (
                        <div>
                            <p>{ key.label }</p>
                            { key.boxes }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stress;