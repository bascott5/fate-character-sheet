import { useState, useContext } from "react";
import { Context } from "./context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

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
                <h1>CONSEQUENCES</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-56px 0px 0px 323px" }}
                    src={
                        context.theme.theme == "Blue" ? blueedit :
                        context.theme.theme == "Red" ? rededit :
                        context.theme.theme == "Green" ? greenedit :
                        context.theme.theme == "Purple" ? purpleedit :
                        null
                    }
                    alt="Edit!"
                    width={30}
                    height={30}
                    onClick={() => isEdit(!edit)}
                />
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT CONSEQUENCES</h2>
                    {context.consequences.map((consequence, consequenceIndex) => (
                        <ModifyMenu arr={ context.consequences } element={ consequence } arrKey={ "consequences" } initIndex={ consequenceIndex } isVisible={ modify }>
                            <div>
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
                        </ModifyMenu>
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