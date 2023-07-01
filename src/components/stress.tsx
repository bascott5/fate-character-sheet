import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import DragNDrop from "./drag-n-drop";

export interface StressTypes {
    label: string,
    boxes: boolean[], //TODO: change to also accept numbers as an input
    boxesLength: number,
    notes: string,
    height: number
}

const Stress: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.stress.map((stressElement, stressIndex) => {
            for (let i = 0; i < stressElement.boxesLength; i++) {
                if (stressElement.boxesLength > stressElement.boxes.length) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "stress",
                        value: context.stress,
                        propertyKey: "boxes",
                        propertyIndex: stressIndex,
                        propertyValue: stressElement.boxes
                    })
                } else if (stressElement.boxesLength < stressElement.boxes.length) {
                    dispatch({
                        type: "DELETE BOX",
                        key: "stress",
                        value: context.stress,
                        propertyKey: "boxes",
                        propertyIndex: stressIndex,
                        propertyValue: stressElement.boxes
                    })
                }
            }
        })
    }, [context.stress]);

    return (
        <div className="characterSheetBox">
            <h1>STRESS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT STRESS</h2>
                        {context.stress.map((stressElement, stressIndex) => (
                            <DragNDrop arr={ context.stress } arrKey={ "stress" } element={ stressElement } initIndex={ stressIndex } isVisible={ modify }>
                                <div>
                                    {modify ?
                                        <div>
                                            <div>
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
                                    <input type="number" value={ stressElement.boxesLength } min={0} max={10} onChange={(e) => {
                                        dispatch({
                                            type: "HANDLE INPUT",
                                            key: "stress",
                                            value: context.stress,
                                            propertyKey: "boxesLength",
                                            propertyIndex: stressIndex,
                                            event: e.target.valueAsNumber
                                        })
                                    }}/>
                                    {

                                    }
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
                            </DragNDrop>
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
                                boxesLength: 0,
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
                        {stressElement.boxes.map((box, boxIndex) => (
                            <div>
                                <svg style={{ display: stressElement.boxesLength != 0 ? "block" : "none" }}>
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
}

export default Stress;