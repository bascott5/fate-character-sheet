import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import Image from "next/image";
import Edit from "./edit";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

export interface AspectTypes {
    categoryHeader: string,
    label: string,
    aspect: string,
    flags: string,
    freeInvokes: boolean[],
    freeInvokesLength: number,
    notes: string
}

const Aspects: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.aspects.map((aspect, aspectIndex) => {
            for (let i = 0; i < aspect.freeInvokesLength; i++) {
                if (aspect.freeInvokesLength > aspect.freeInvokes.length) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "aspects",
                        value: context.aspects,
                        propertyKey: "freeInvokes",
                        propertyIndex: aspectIndex,
                        propertyValue: [...aspect.freeInvokes, false]
                    })
                } else if (aspect.freeInvokesLength < aspect.freeInvokes.length) {
                    dispatch({
                        type: "DELETE BOX",
                        key: "aspects",
                        value: context.aspects,
                        propertyKey: "freeInvokes",
                        propertyIndex: aspectIndex,
                        propertyValue: aspect.freeInvokes
                    })
                }
            }
        })
    }, [context.aspects]);

    /*return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <Edit title="ASPECTS">
                {context.aspects.map((aspect, aspectIndex) => (
                    <ModifyMenu arr={ context.aspects } element={ aspect } arrKey={ "aspects" } initIndex={ aspectIndex } isVisible={ modify }>
                        <div>
                            <h3 style={{ fontWeight: "bold" }}>CATEGORY HEADER &#40;OPTIONAL&#41;</h3>
                            <input type="text" value={ aspect.categoryHeader } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "categoryHeader",
                                propertyIndex: aspectIndex,
                                event: e.target.value
                            })}/>
                            <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                            <input type="text" value={ aspect.label } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "label",
                                propertyIndex: aspectIndex,
                                event: e.target.value
                            })}/>
                            <h3 style={{ fontWeight: "bold" }}>ASPECT</h3>
                            <input type="text" value={ aspect.aspect } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "aspect",
                                propertyIndex: aspectIndex,
                                event: e.target.value
                            })}/>
                            <h3 style={{ fontWeight: "bold" }}>FLAGS</h3>
                            <input type="text" value={ aspect.flags } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "flags",
                                propertyIndex: aspectIndex,
                                event: e.target.value
                            })}/>
                            <h3 style={{ fontWeight: "bold" }}>FREE INVOKES</h3>
                            <input type="number" value={ aspect.freeInvokesLength } max={10} min={0} onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "freeInvokesLength",
                                propertyIndex: aspectIndex,
                                event: e.target.valueAsNumber
                            })}/>
                            <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                            <input type="text" value={ aspect.notes } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "aspects",
                                value: context.aspects,
                                propertyKey: "notes",
                                propertyIndex: aspectIndex,
                                event: e.target.value
                            })}/>
                        </div>
                    </ModifyMenu>
                ))}
                <AddModify modify={ () => isModify(!modify) } arr={ context.aspects } arrKey={ "aspects" } newElement={{
                    categoryHeader: "",
                    label: "",
                    aspect: "",
                    flags: "",
                    freeInvokes: [],
                    freeInvokesLength: 0,
                    notes: ""
                }}/>
            </Edit>
            <div style={context.aspects.length == 0 ? { padding: "0px 0px 0px 0px" } : { padding: "0px 0px 0px 0px" }}>
                {context.aspects.map((aspect, aspectIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ aspect.categoryHeader.toUpperCase() }</h3>
                        <p style={{ fontWeight: "bold", color: context.theme.color }}>{ aspect.label.toUpperCase() }</p>
                        <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{ aspect.aspect }</p> <p style={aspect.flags.length == 0 ? { display: "none" } : { display: "inline-block" } }>&#40;{ aspect.flags }&#41;</p>
                        <p>{ aspect.notes.toUpperCase() }</p>
                        {aspect.freeInvokes.map((invoke, invokeIndex) => (
                        <svg style={{ display: aspect.freeInvokesLength != 0 ? "block" : "none" }} viewBox="0 0 1500 35">
                            <rect className="box" style={{ fill: invoke ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
                                type: "TOGGLE NESTED BOX",
                                key: "aspects",
                                value: context.aspects,
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
        </div>
    );*/

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <h1>ASPECTS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-56px 0px 0px 180px" }}
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
                    {context.aspects.map((aspect, aspectIndex) => (
                        <ModifyMenu arr={ context.aspects } element={ aspect } arrKey={ "aspects" } initIndex={ aspectIndex } isVisible={ modify }>
                            <div>
                                <h3 style={{ fontWeight: "bold" }}>CATEGORY HEADER &#40;OPTIONAL&#41;</h3>
                                <input type="text" value={ aspect.categoryHeader } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "categoryHeader",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                                <input type="text" value={ aspect.label } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "label",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>ASPECT</h3>
                                <input type="text" value={ aspect.aspect } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "aspect",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>FLAGS</h3>
                                <input type="text" value={ aspect.flags } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "flags",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>FREE INVOKES</h3>
                                <input type="number" value={ aspect.freeInvokesLength } max={10} min={0} onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "freeInvokesLength",
                                    propertyIndex: aspectIndex,
                                    event: e.target.valueAsNumber
                                })}/>
                                <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                                <input type="text" value={ aspect.notes } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "notes",
                                    propertyIndex: aspectIndex,
                                    event: e.target.value
                                })}/>
                            </div>
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.aspects } arrKey={ "aspects" } newElement={{
                        categoryHeader: "",
                        label: "",
                        aspect: "",
                        flags: "",
                        freeInvokes: [],
                        freeInvokesLength: 0,
                        notes: ""
                    }}/>
                </div>
            ) : null} 
            <div>
                {context.aspects.map((aspect, aspectIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ aspect.categoryHeader.toUpperCase() }</h3>
                        <p style={{ fontWeight: "bold", color: context.theme.color }}>{ aspect.label.toUpperCase() }</p>
                        <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{ aspect.aspect }</p> <p style={aspect.flags.length == 0 ? { display: "none" } : { display: "inline-block" } }>&#40;{ aspect.flags }&#41;</p>
                        <p>{ aspect.notes.toUpperCase() }</p>
                        {aspect.freeInvokes.map((invoke, invokeIndex) => (
                        <svg style={{ display: aspect.freeInvokesLength != 0 ? "block" : "none" }} viewBox="0 0 1500 35">
                            <rect className="box" style={{ fill: invoke ? context.theme.color : "white" }} height={25} width={25} onClick={() => dispatch({
                                type: "TOGGLE NESTED BOX",
                                key: "aspects",
                                value: context.aspects,
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
        </div>
    );
}

export default Aspects;