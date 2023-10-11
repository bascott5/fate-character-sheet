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
            <div style={{ margin: "0px 0px 50px 0px" }}>
                <h1 className="title" style={{ margin: "0px 0px 0px 0px" }}>STRESS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
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
            <div>
                {edit ? (
                    <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                        <h2 className="title" style={{ color: "white" }}>EDIT STRESS</h2>
                        {context.stress.map((stressElement, stressIndex) => (
                            <ModifyMenu arr={ context.stress } element={ stressElement } arrKey={ "stress" } initIndex={ stressIndex } isVisible={ modify }>
                                <div>
                                    <h3 className="headerText">LABEL</h3>
                                    <input className="input" type="text" value={ stressElement.label } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "stress",
                                        value: context.stress,
                                        propertyKey: "label",
                                        propertyIndex: stressIndex,
                                        event: e.target.value
                                    })}/>
                                    <h3 className="headerText">TRACK LENGTH</h3>
                                    <input className="input" type="number" value={ stressElement.boxesLength } min={0} max={10} onChange={(e) => {
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
                                            <h3 className="headerText">BOX VALUES</h3>
                                            {context.stress[stressIndex].boxes.map((box, boxIndex) => (
                                                <input className="input" style={{ width: "40px", margin: "0px 10px 10px 0px" }} type="number" value={ box.value } max={10} min={1} onChange={(e) => dispatch({
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
                                    <h3 className="headerText">NOTES</h3>
                                    <input className="input" type="text" value={ stressElement.notes } onChange={(e) => dispatch({
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
                    <div style={ Object.values(stressElement).toString() == ",,0," ? { display: "none" } : edit ? { margin: "25px 0px -21px 0px" } : { margin: "-15px 0px 35px 0px" } }>
                        <h3 style={{ fontWeight: "bold", margin: "0px 0px 10px 0px" }}>{ stressElement.label }</h3>
                        <p className="paragraph">{ stressElement.notes }</p>
                        <div className="svgContainer">
                            {stressElement.boxes.map((box, boxIndex) => (
                                <div className="boxContainer">
                                    <svg style={{ display: stressElement.boxesLength != 0 ? "block" : "none", margin: "10px 0px 25px 0px" }} viewBox="0 0 250 30">
                                        <rect className="box" style={{ fill: box.highlighted ? context.theme.color : "white" }} height={"25"} width={"25"} onClick={() => dispatch({
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
                                        <text x={ box.value < 10 ? "9" : "3"} y="18" style={{ pointerEvents: "none" }} font-size="15" fill={ box.highlighted ? "lightgrey" : "dimgrey" }>{ box.value.toString() }</text>
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stress;