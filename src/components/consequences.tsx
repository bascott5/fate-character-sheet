import { useState, useContext } from "react";
import { Context } from "./context-provider";
import DragNDrop from "./drag-n-drop";

export interface ConsequenceTypes {
    label: string,
    value: number,
    highlighted: boolean,
    recovering: boolean,
    recoveringText: string
}

const Consequences: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="characterSheetBox" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <h1>CONSEQUENCES</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT CONSEQUENCES</h2>
                        {context.consequences.map((consequence, consequenceIndex) => (
                            <DragNDrop arr={ context.consequences } arrKey={ "consequences" } element={ consequence } initIndex={ consequenceIndex } isVisible={ modify }>
                                <div>
                                    {modify ? (
                                        <div>
                                            <svg>
                                                <rect 
                                                    fill="red" 
                                                    height={15} 
                                                    width={15} 
                                                    onClick={() => dispatch({
                                                        type: "DELETE OBJECT",
                                                        key: "consequences",
                                                        value: context.consequences,
                                                        propertyKey: consequence
                                                    })}
                                                />
                                            </svg>
                                        </div>
                                    ) : null}
                                    <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                                    <input type="text" value={ consequence.label } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "consequences",
                                        value: context.consequences,
                                        propertyKey: "label",
                                        propertyIndex: consequenceIndex,
                                        event: e.target.value
                                    })}/>
                                    <h3 style={{ fontWeight: "bold" }}>CONSEQUENCE VALUE</h3>
                                    <input type="number" value={ consequence.value } min={1} max={9} onChange={(e) => {
                                        dispatch({
                                            type: "HANDLE INPUT",
                                            key: "consequences",
                                            value: context.consequences,
                                            propertyKey: "value",
                                            propertyIndex: consequenceIndex,
                                            event: e.target.valueAsNumber
                                        })
                                    }}/>
                                </div>
                            </DragNDrop>
                        ))}
                        <button 
                            className="characterSheetButton" 
                            style={{ color: context.theme.color, outlineColor: context.theme.color }}
                            onClick={() => dispatch({
                            type: "ADD OBJECT",
                            key: "consequences",
                            value: context.consequences,
                            addedValue: {
                                label: "",
                                value: 1,
                                highlighted: false,
                                recovering: false,
                                recoveringText: ""
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
                ) : null}
                {context.consequences.map((consequence, consequenceIndex) => (
                    <div>
                        <svg>
                            <rect className="box" style={{ fill: consequence.highlighted ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
                                type: "TOGGLE BOX",
                                key: "consequences",
                                value: context.consequences,
                                propertyKey: "highlighted",
                                propertyIndex: consequenceIndex,
                                propertyValue: consequence.highlighted
                            })}/>
                            <text x="8" y="17" style={{ pointerEvents: "none" }} font-family="Verdana" font-size="15" fill="grey">{ consequence.value.toString() }</text>
                        </svg>
                        <h3 style={{ fontWeight: "bold" }}>{ consequence.label }</h3>
                        <h3 style={{ fontWeight: "bold", display: consequence.label != "" ? "block" : "none" }}>LABEL</h3>
                        {consequence.highlighted ? (
                            <div>
                                <input type="text" value={ consequence.recoveringText } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "consequences",
                                    value: context.consequences,
                                    propertyKey: "recoveringText",
                                    propertyIndex: consequenceIndex,
                                    event: e.target.value
                                })}/>
                                <button style={{ color: consequence.recovering ? "blue" : "red" }} onClick={() => dispatch({
                                    type: "TOGGLE BOX",
                                    key: "consequences",
                                    value: context.consequences,
                                    propertyKey: "recovering",
                                    propertyIndex: consequenceIndex,
                                    propertyValue: consequence.recovering
                                })}>_/</button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Consequences;