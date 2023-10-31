import React from "react";
import { useState, useContext } from "react";
import { Context } from "./context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";
import bluecheckmark from "../images/bluecheckmark.svg";
import redcheckmark from "../images/redcheckmark.svg";
import purplecheckmark from "../images/purplecheckmark.svg";
import bluetrash from "../images/bluetrash.svg";
import redtrash from "../images/redtrash.svg";
import purpletrash from "../images/purpletrash.svg";

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
            <div style={{ margin: "0px 0px 50px 0px" }}>
                <h1 className="title" style={{ margin: "0px 0px 0px 0px" }}>CONSEQUENCES</h1>
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
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 className="title" style={{ color: "white" }}>EDIT CONSEQUENCES</h2>
                    {context.consequences.map((consequence, consequenceIndex) => (
                        <ModifyMenu key={ consequenceIndex } arr={ context.consequences } element={ consequence } arrKey={ "consequences" } initIndex={ consequenceIndex } isVisible={ modify }>
                            <div>
                                <h3 className="headerText">LABEL</h3>
                                <input className="input" type="text" value={ consequence.label } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "consequences",
                                    value: context.consequences,
                                    propertyKey: "label",
                                    propertyIndex: consequenceIndex,
                                    event: e.target.value
                                })}/>
                                <h3 className="headerText">CONSEQUENCE VALUE</h3>
                                <input className="input" type="number" value={ consequence.value } min={1} max={9} onChange={(e) => {
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
                <div key={ consequenceIndex } style={ Object.values(consequence).toString() == ",1,false,false," ? { display: "none" } : edit ? { margin: "25px 0px 0px 0px" } : { margin: "-15px 0px 35px 0px" } } >
                    <div className="svgContainer">
                        <div className="boxContainer">
                            <svg viewBox="0 0 250 30">
                                <rect className="box" style={{ fill: consequence.highlighted ? context.theme.color : "white" }} height={"25"} width={"25"} onClick={() => dispatch({
                                    type: "TOGGLE BOX",
                                    key: "consequences",
                                    value: context.consequences,
                                    propertyKey: "highlighted",
                                    propertyIndex: consequenceIndex,
                                    propertyValue: consequence.highlighted
                                })}/>
                                <text style={{ pointerEvents: "none" }} x={consequence.value < 10 ? "9" : "3"} y="17" font-family="Verdana" font-size="15" fill={ consequence.highlighted ? "lightgrey" : "dimgrey" }>{ consequence.value.toString() }</text>
                            </svg>
                        </div>
                    </div>
                    <h3 className="headerText">{ consequence.label }</h3>
                    {consequence.highlighted ? (
                        <div>
                            <input className="input" type="text" value={ consequence.recoveringText } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "consequences",
                                value: context.consequences,
                                propertyKey: "recoveringText",
                                propertyIndex: consequenceIndex,
                                event: e.target.value
                            })}/>
                            <Image 
                                priority
                                loading="eager"
                                style={{ margin: "0px 0px -5px 0px" }}
                                src={ 
                                    context.theme.theme == "Blue" ? consequence.recovering ? bluecheckmark : bluetrash :
                                    context.theme.theme == "Red" ? consequence.recovering ? redcheckmark : redtrash :
                                    context.theme.theme == "Purple" ? consequence.recovering ? purplecheckmark : purpletrash :
                                    null
                                }
                                alt={consequence.recovering ? "Checked!" : "Unchecked!"}
                                width={20}
                                height={20}
                                onClick={() => dispatch({
                                    type: "TOGGLE BOX",
                                    key: "consequences",
                                    value: context.consequences,
                                    propertyKey: "recovering",
                                    propertyIndex: consequenceIndex,
                                    propertyValue: consequence.recovering
                                })}
                            />
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Consequences;