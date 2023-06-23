import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import { dice } from "@/components/dice";
import DragNDrop from "./drag-n-drop";

export interface AspectTypes {
    "categoryHeader": string,
    "label": string,
    "aspect": string,
    "flags": string,
    "freeInvokes": boolean[],
    "notes": string
}

const Aspects: React.FC = () => {
    const [aspects, setAspects] = useState<AspectTypes[]>([{
        categoryHeader: "",
        label: "",
        aspect: "",
        flags: "",
        freeInvokes: [],
        notes: ""
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        context.aspects.map((aspect, aspectIndex) => {
            for (let i = 0; i < aspect.freeInvokes.length; i++) {
                if (aspect.freeInvokes[i] == undefined) {
                    dispatch({ 
                        type: "ADD BOX",
                        key: "aspects",
                        value: context.aspects,
                        propertyIndex: aspectIndex
                    })
                    //aspect.freeInvokes.replace(i, 0, [...aspect.freeInvokes, false]);
                }
            } 
        })
    }, [context.aspects])

    return (
        <div className="characterSheetBox">
            <h1>ASPECTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT ASPECTS</h2>
                        {context.aspects.map((aspect, aspectIndex) => (
                            <div>
                                {modify ? 
                                    <div>
                                        <DragNDrop arr={ context.aspects } initIndex={ aspectIndex }>
                                            <svg>
                                                <rect 
                                                    fill="red" 
                                                    height={15} 
                                                    width={15} 
                                                    onClick={() => dispatch({
                                                        type: "DELETE OBJECT",
                                                        key: "aspects",
                                                        value: context.aspects,
                                                        propertyKey: aspect
                                                    })}
                                                />
                                            </svg>
                                        </DragNDrop>
                                    </div>
                                    :
                                    null
                                }
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
                                <input type="number" value={ aspect.freeInvokes.length } max={10} min={0} onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "aspects",
                                    value: context.aspects,
                                    propertyKey: "freeInvokes",
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
                        ))}
                        <button 
                    className="characterSheetButton" 
                    onClick={() => dispatch({
                        type: "ADD OBJECT",
                        key: "aspects",
                        value: context.aspects,
                        addedValue: {
                            categoryHeader: "",
                            label: "",
                            aspect: "",
                            flags: "",
                            freeInvokes: [],
                            notes: ""
                        }
                    })}>
                    +Add
                </button>
                <button 
                    className="characterSheetButton"
                    onClick={() => isModify(!modify)}>
                    Modify
                </button>
                    </div>
                )
                    :
                    null
                }
            {context.aspects.map((aspect, aspectIndex) => (
                <div>
                    <h3 style={{ fontWeight: "bold" }}>{ aspect.categoryHeader.toUpperCase() }</h3>
                    <p style={{ color: "blue", fontWeight: "bold" }}>{ aspect.label.toUpperCase() }</p>
                    <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{ aspect.aspect }</p> <p style={aspect.flags.length == 0 ? { display: "none" } : { display: "inline-block" } }>&#40;{ aspect.flags }&#41;</p>
                    <p>{ aspect.notes.toUpperCase() }</p>
                    {aspect.freeInvokes.map((invoke, invokeIndex) => (
                    <svg>
                        <rect className="box" style={{ fill: invoke ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
                            type: "TOGGLE BOX",
                            key: "aspects",
                            value: context.aspects,
                            propertyKey: "freeInvokes",
                            propertyIndex: invokeIndex,
                            propertyValue: invoke
                        })}/>
                    </svg>
                ))}
                </div>
            ))}
            </div>
        </div>
    )
}

export default Aspects;