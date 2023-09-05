import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

export interface SituationTypes {
    aspect: string,
    freeInvokes: boolean[],
    freeInvokesLength: number
    notes: string
}

const SituationAspects: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.situationAspects.map((aspect, aspectIndex) => {
            for (let i = 0; i < aspect.freeInvokesLength; i++) {
                if (aspect.freeInvokesLength > aspect.freeInvokes.length) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "situationAspects",
                        value: context.situationAspects,
                        propertyKey: "freeInvokes",
                        propertyIndex: aspectIndex,
                        propertyValue: [...aspect.freeInvokes, false]
                    })
                } else if (aspect.freeInvokesLength < aspect.freeInvokes.length) {
                    dispatch({
                        type: "DELETE BOX",
                        key: "situationAspects",
                        value: context.situationAspects,
                        propertyKey: "freeInvokes",
                        propertyIndex: aspectIndex,
                        propertyValue: aspect.freeInvokes
                    })
                }
            }
        })
    }, [context.situationAspects]);
    
    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <h1>SITUATION ASPECTS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-56px 0px 0px 398px" }}
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
                    <h2 style={{ color: "white" }}>EDIT ASPECTS</h2>
                    {context.situationAspects.map((aspect, aspectIndex) => (
                        <ModifyMenu arr={ context.situationAspects } element={ aspect } arrKey={ "situationAspects" } initIndex={ aspectIndex } isVisible={ modify }>
                            <div>
                                <h3 style={{ fontWeight: "bold" }}>ASPECT</h3>
                                <input type="text" value={ aspect.aspect } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "situationAspects",
                                    value: context.situationAspects,
                                    propertyKey: "aspect",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>FREE INVOKES</h3>
                                <input type="number" value={ aspect.freeInvokesLength } min={0} max={10} onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "situationAspects",
                                    value: context.situationAspects,
                                    propertyKey: "freeInvokesLength",
                                    propertyIndex: aspectIndex,
                                    event: e.target.valueAsNumber
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                                <input type="text" value={ aspect.notes } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "situationAspects",
                                    value: context.situationAspects,
                                    propertyKey: "notes",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                            </div>
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.situationAspects } arrKey={ "situationAspects" } newElement={{
                        aspect: "",
                        freeInvokes: [],
                        freeInvokeLength: 0,
                        notes: ""
                    }}/>
                </div>
            ) : null}
            {context.situationAspects.map((aspect, aspectIndex) => (
                <div>
                    <h3 style={{ fontWeight: "bold" }}>{ aspect.aspect }</h3>
                    <p>{ aspect.notes }</p>
                    {aspect.freeInvokes.map((invoke, invokeIndex) => (
                        <svg style={{ display: aspect.freeInvokesLength != 0 ? "block" : "none" }} viewBox="0 0 1500 35">
                            <rect className="box" style={{ fill: invoke ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
                                type: "TOGGLE NESTED BOX",
                                key: "situationAspects",
                                value: context.situationAspects,
                                propertyKey: "freeInvokes",
                                propertyIndex: aspectIndex,
                                propertyValue: aspect.freeInvokes,
                                nestedPropertyIndex: invokeIndex
                            })}/>
                        </svg>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default SituationAspects