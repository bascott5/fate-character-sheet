import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

interface BoxTypes {
    highlighted: boolean,
    value: number
}

export interface ConditionTypes {
    label: string,
    boxes: BoxTypes[],
    boxesLength: number,
    notes: string
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
            <div>
                <h1 className="title">CONDITIONS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-54px 0px 0px 237px" }}
                    src={
                        context.theme.theme == "Blue" ? blueedit :
                        context.theme.theme == "Red" ? rededit :
                        context.theme.theme == "Green" ? greenedit :
                        context.theme.theme == "Purple" ? purpleedit :
                        null
                    }
                    alt="Edit!"
                    width={25}
                    height={25}
                    onClick={() => isEdit(!edit)}
                />
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 className="title" style={{ color: "white" }}>EDIT CONDITIONS</h2>
                    {context.conditions.map((condition, conditionIndex) => (
                        <ModifyMenu arr={ context.conditions } element={ condition } arrKey={ "conditions" } initIndex={ conditionIndex } isVisible={ modify }>
                            <div>
                                <h3 className="headerText">LABEL</h3>
                                <input className="input" type="text" value={ condition.label } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "conditions",
                                    value: context.conditions,
                                    propertyKey: "label",
                                    propertyIndex: conditionIndex,
                                    event: e.target.value
                                })}/>
                                <h3 className="headerText">TRACK LENGTH</h3>
                                <input className="input" type="number" value={ condition.boxesLength } min={0} max={10} onChange={(e) => {
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
                                        <h3 className="headerText">BOX VALUES</h3>
                                        {condition.boxes.map((box, boxIndex) => (
                                            <input className="input" type="number" value={ box.value } max={10} min={1} onChange={(e) => dispatch({
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
                                        ))}
                                    </div>
                                ) : null}
                                <h3 className="headerText">NOTES</h3>
                                <input className="input" type="text" value={ condition.notes } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "conditions",
                                    value: context.conditions,
                                    propertyKey: "notes",
                                    propertyIndex: conditionIndex,
                                    event: e.target.value
                                })}/>
                            </div>
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.conditions } arrKey={ "conditions" } newElement={{
                        label: "",
                        boxes: [],
                        boxesLength: 0,
                        notes: ""
                    }}/>
                </div>
            ) : null}
            {context.conditions.map((condition, conditionIndex) => (
                <div>
                    <h3 style={{ fontWeight: "bold" }}>{ condition.label }</h3>
                    <p>{ condition.notes }</p>
                    <div className="svgContainer">
                    {condition.boxes.map((box, boxIndex) => (
                        <div className="boxContainer">
                            <svg style={{ display: condition.boxesLength != 0 ? "block" : "none" }} viewBox="0 0 250 30">
                                <rect className="box" style={{ fill: box.highlighted ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
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
                </div>
            ))}
        </div>
    )
}

export default Conditions;