import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import DragNDrop from "./drag-n-drop";

interface BoxTypes {
    highlighted: boolean,
    value: number
}

export interface ConditionTypes {
    label: string,
    boxes: BoxTypes[],
    boxesLength: number,
    notes: string,
    height: number
}

const Conditions: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.conditions.map((condition, conditionIndex) => {
            for (let i = 0; i < condition.boxesLength; i++) {
                if (condition.boxesLength > condition.boxes.length) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "conditions",
                        value: context.conditions,
                        propertyKey: "boxes",
                        propertyIndex: conditionIndex,
                        propertyValue: [...condition.boxes, { highlighted: false, value: 1 }]
                    })
                } else if (condition.boxesLength < condition.boxes.length) {
                    dispatch({
                        type: "DELETE BOX",
                        key: "conditions",
                        value: context.conditions,
                        propertyKey: "boxes",
                        propertyIndex: conditionIndex,
                        propertyValue: condition.boxes
                    })
                }
            }
        })
    }, [context.conditions]);

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <h1>CONDITIONS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT CONDITIONS</h2>
                        {context.conditions.map((condition, conditionIndex) => (
                            <DragNDrop arr={ context.conditions } arrKey={ "conditions" } element={ condition } initIndex={ conditionIndex } isVisible={ modify }>
                                <div>
                                    {modify ?
                                        <div>characterSheetBox
                                            <div>
                                                <svg>
                                                    <rect 
                                                        fill="red" 
                                                        height={15} 
                                                        width={15} 
                                                        onClick={() => dispatch({
                                                            type: "DELETE OBJECT",
                                                            key: "conditions",
                                                            value: context.conditions,
                                                            propertyKey: condition
                                                        })}
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    :
                                        null
                                    }
                                    <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                                    <input type="text" value={ condition.label } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "conditions",
                                        value: context.conditions,
                                        propertyKey: "label",
                                        propertyIndex: conditionIndex,
                                        event: e.target.value
                                    })}/>
                                    <h3 style={{ fontWeight: "bold" }}>TRACK LENGTH</h3>
                                    <input type="number" value={ condition.boxesLength } min={0} max={10} onChange={(e) => {
                                        dispatch({
                                            type: "HANDLE INPUT",
                                            key: "conditions",
                                            value: context.conditions,
                                            propertyKey: "boxesLength",
                                            propertyIndex: conditionIndex,
                                            event: e.target.valueAsNumber
                                        })
                                    }}/>
                                    {condition.boxesLength != 0 ? (
                                        <div>
                                            <h3 style={{ fontWeight: "bold" }}>BOX VALUES</h3>
                                            {condition.boxes.map((box, boxIndex) => (
                                                <input type="number" value={ box.value } max={10} min={1} onChange={(e) => dispatch({
                                                    type: "HANDLE NESTED INPUT",
                                                    key: "conditions",
                                                    value: context.conditions,
                                                    propertyKey: "boxes",
                                                    propertyIndex: conditionIndex,
                                                    propertyValue: condition.boxes,
                                                    nestedPropertyIndex: boxIndex,
                                                    nestedPropertyKey: "value",
                                                    event: e.target.valueAsNumber
                                                })} />
                                            ))
                                            }
                                        </div>
                                    ) : null}
                                    <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                                    <input type="text" value={ condition.notes } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "conditions",
                                        value: context.conditions,
                                        propertyKey: "notes",
                                        propertyIndex: conditionIndex,
                                        event: e.target.value
                                    })}/>
                                </div>
                            </DragNDrop>
                        ))}
                        <button 
                            className="characterSheetButton"
                            style={{ color: context.theme.color, outlineColor: context.theme.color }}
                            onClick={() => dispatch({
                            type: "ADD OBJECT",
                            key: "conditions",
                            value: context.conditions,
                            addedValue: {
                                label: "",
                                boxes: [],
                                boxesLength: 0,
                                notes: "",
                                height: 0
                            }
                        })}>
                            +Add
                        </button>
                        <button 
                            className="characterSheetButton"
                            style={{ color: context.theme.color, outlineColor: context.theme.color }}
                            onClick={() => isModify(!modify)}>
                            Modify
                        </button>
                    </div>
                )
                :
                    null
                }
                {context.conditions.map((condition, conditionIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ condition.label }</h3>
                        <p>{ condition.notes }</p>
                        {condition.boxes.map((box, boxIndex) => (
                            <div>
                                <svg style={{ display: condition.boxesLength != 0 ? "block" : "none" }}>
                                    <rect className="box" style={{ fill: box.highlighted ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
                                        type: "TOGGLE STRESS",
                                        key: "conditions",
                                        value: context.conditions,
                                        propertyKey: "boxes",
                                        propertyIndex: conditionIndex,
                                        propertyValue: condition.boxes,
                                        nestedPropertyIndex: boxIndex,
                                        nestedPropertyKey: "highlighted",
                                        nestedPropertyValue: box.highlighted
                                    })}/>
                                    <text x="8" y="17" style={{ pointerEvents: "none" }} font-family="Verdana" font-size="15" fill="grey">{ box.value.toString() }</text>
                                </svg>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Conditions;