//TODO: turn altering key.boxes into a function so it can be more easily understood which box is being referred to by the computer
import { useState, useContext } from "react";
import { Context } from "./context-provider";

export interface StressTypes {
    label: string
    boxes: boolean[]
}

const Stress: React.FC = () => {
    const [stress, setStress] = useState<StressTypes[]>([{
            label: "",
            boxes: [false]
        }]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    const changeBox = () => {
        stress.map(key => (
            {...key, boxes: [...key.boxes].map(box => (
                !box
            ))}
        ))
        return [...stress]
    }

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1>
            <button className="characterSheetButton" onClick={() => setStress([...stress, { label: "", boxes: [false] }])}>+blocks</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stress.map((key: StressTypes, stressIndex: number) => (
                        <div>
                            <input type="text" value={ key.label } onChange={(e) => setStress(stress => {
                                let stressCopy = [...stress];
                                stressCopy[stressIndex].label = e.target.value;
                                return [...stressCopy];
                            })} />
                            {key.boxes.map((box: boolean, boxIndex: number) => (
                                <div>
                                    <svg>
                                        <rect className="box" style={{ fill: box ? "red" : "white" }} height={25} width={25} onClick={() => setStress(current =>
                                            current.map((stress, localStressIndex) => {
                                                if (localStressIndex === stressIndex) {
                                                    return {
                                                        ...stress,
                                                        boxes: stress.boxes.map(
                                                            (box, localBoxIndex) => {
                                                                if (localBoxIndex === boxIndex) {
                                                                    return !box;
                                                                }
                                                            return box;
                                                        }
                                                    ),
                                                };
                                            }
                                            return stress;
                                        })
                                    )} />
                                    </svg>
                                </div>
                            ))}
                            <button onClick={() => setStress((current) =>
                                current.map((stress, index) =>
                                    index === stressIndex ? { ...stress, boxes: [...stress.boxes, false] } : stress
                                )
                            )}>+block</button>
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