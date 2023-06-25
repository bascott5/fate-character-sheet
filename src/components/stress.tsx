//TODO: turn altering key.boxes into a function so it can be more easily understood which box is being referred to by the computer
import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import DragNDrop from "./drag-n-drop";

export interface StressTypes {
    label: string,
    boxes: boolean[], //TODO: change to also accept numbers as an input
    notes: string
}

const Stress: React.FC = () => {
    const [stress, setStress] = useState<StressTypes[]>([{
            label: "",
            boxes: [false],
            notes: ""
        }]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.stress.map((stressElement, stressIndex) => {
            for (let i = 0; i < stressElement.boxes.length; i++) {
                if (stressElement.boxes[i] == undefined) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "stress",
                        value: context.stress,
                        propertyKey: "boxes",
                        propertyIndex: stressIndex,
                        propertyValue: stressElement.boxes
                    })
                }
            } 
        })
    }, [context.stress])

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT STRESS</h2>
                        {context.stress.map((stressElement, stressIndex) => (
                            <div>
                                {modify ?
                                    <div>
                                        <div>
                                            <DragNDrop arr={ context.stress } initIndex={ stressIndex } isVisible={ modify }>
                                                <svg>
                                                    <rect 
                                                        fill="red" 
                                                        height={15} 
                                                        width={15} 
                                                        onClick={() => dispatch({
                                                            type: "DELETE OBJECT",
                                                            key: "stress",
                                                            value: context.stress,
                                                            propertyKey: stressElement
                                                        })}
                                                    />
                                                </svg>
                                            </DragNDrop>
                                        </div>
                                    </div>
                                :
                                    null
                                }
                                <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                                <input type="text" value={ stressElement.label } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "stress",
                                    value: context.stress,
                                    propertyKey: "label",
                                    propertyIndex: stressIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>TRACK LENGTH</h3>
                                <input type="number" value={ stressElement.boxes.length } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "stress",
                                    value: context.stress,
                                    propertyKey: "boxes",
                                    propertyIndex: stressIndex,
                                    event: e.target.valueAsNumber
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>BOX VALUES</h3>
                                <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                                <input type="text" value={ stressElement.notes } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "stress",
                                    value: context.stress,
                                    propertyKey: "notes",
                                    propertyIndex: stressIndex,
                                    event: e.target.value
                                })}/>
                            </div>
                        ))}
                        <button 
                            className="characterSheetButton" 
                            onClick={() => dispatch({
                            type: "ADD OBJECT",
                            key: "stress",
                            value: context.stress,
                            addedValue: {
                                label: "",
                                boxes: [],
                                notes: ""
                            }
                        })}>
                            +Add
                        </button>
                        <button 
                            className="characterSheetButton"
                            onClick={() => isModify(!modify)}>
                            Modify
                        </button>
                    </div>
                )
                :
                    null
                }
                {context.stress.map((stressElement, stressIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ stressElement.label }</h3>
                        <p>{ stressElement.notes }</p>
                        {stressElement.boxes.map((box, boxIndex) => ( //TODO: map stressElement object as an array, then map the boxes property
                            <div>
                                <svg>
                                    <rect className="box" style={{ fill: box ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
                                        type: "TOGGLE NESTED BOX",
                                        key: "stress",
                                        value: context.stress,
                                        propertyKey: "boxes",
                                        propertyIndex: stressIndex,
                                        propertyValue: stressElement.boxes,
                                        nestedPropertyIndex: boxIndex
                                    })}/>
                                </svg>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )

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