import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";

interface BoxTypes {
    highlighted: boolean,
    value: number
}

export interface StressTypes {
    label: string,
    boxes: BoxTypes[],
    boxesLength: number,
    notes: string
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
                        propertyValue: [...stressElement.boxes, { highlighted: false, value: 1 }]
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
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <svg style={{position: "absolute"}} viewBox="-135 -7 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>STRESS</h1>
            </div>
            <div>
                {edit ? (
                    <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                        <h2 style={{ color: "white" }}>EDIT STRESS</h2>
                        {context.stress.map((stressElement, stressIndex) => (
                            <ModifyMenu arr={ context.stress } element={ stressElement } arrKey={ "stress" } initIndex={ stressIndex } isVisible={ modify }>
                                <div>
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
                                    {stressElement.boxesLength != 0 ? (
                                        <div>
                                            <h3 style={{ fontWeight: "bold" }}>BOX VALUES</h3>
                                            {context.stress[stressIndex].boxes.map((box, boxIndex) => (
                                                <input type="number" value={ box.value } max={10} min={1} onChange={(e) => dispatch({
                                                    type: "HANDLE NESTED INPUT",
                                                    key: "stress",
                                                    value: context.stress,
                                                    propertyKey: "boxes",
                                                    propertyIndex: stressIndex,
                                                    propertyValue: stressElement.boxes,
                                                    nestedPropertyIndex: boxIndex,
                                                    nestedPropertyKey: "value",
                                                    event: e.target.valueAsNumber
                                                })} />
                                            ))
                                            }
                                        </div>
                                    ) : null}
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
                            </ModifyMenu>
                        ))}
                        <AddModify modify={ () => isModify(!modify) } arr={ context.stress } arrKey={ "stress" } newElement={{
                            label: "",
                            boxes: [],
                            boxesLength: 0,
                            notes: ""
                        }}/>
                    </div>
                ) : null}
                {context.stress.map((stressElement, stressIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ stressElement.label }</h3>
                        <p>{ stressElement.notes }</p>
                        {stressElement.boxes.map((box, boxIndex) => (
                            <div>
                                <svg style={{ display: stressElement.boxesLength != 0 ? "block" : "none" }} viewBox="0 0 1500 35">
                                    <rect className="box" style={{ fill: box.highlighted ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
                                        type: "TOGGLE STRESS",
                                        key: "stress",
                                        value: context.stress,
                                        propertyKey: "boxes",
                                        propertyIndex: stressIndex,
                                        propertyValue: stressElement.boxes,
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

export default Stress;