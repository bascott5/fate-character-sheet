import { useState, useContext } from "react";
import { Context } from "./context-provider";
import DragNDrop from "./drag-n-drop";
import Delete from "./delete";
import AddModify from "./add-modify";

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
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <svg style={{position: "absolute"}} viewBox="-285 -7 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>CONSEQUENCES</h1>
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT CONSEQUENCES</h2>
                    {context.consequences.map((consequence, consequenceIndex) => (
                        <DragNDrop arr={ context.consequences } arrKey={ "consequences" } element={ consequence } initIndex={ consequenceIndex } isVisible={ modify }>
                            <div>
                                {modify ? (
                                    <Delete arr={ context.consequences } arrKey={ "consequences" } element={ consequence } />
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
                    <AddModify modify={ () => isModify(!modify) } arr={ context.consequences } arrKey={ "consequences" } newElement={{
                        label: "",
                        value: 1,
                        highlighted: false,
                        recovering: false,
                        recoveringText: ""
                    }}/>
                </div>
            ) : null}
            {context.consequences.map((consequence, consequenceIndex) => (
                <div>
                    <svg viewBox="0 0 1500 35">
                        <rect className="box" style={{ fill: consequence.highlighted ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
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
    )
}

export default Consequences;