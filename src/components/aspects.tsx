import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import { dice } from "@/components/dice";
import DragNDrop from "./drag-n-drop";

export interface AspectTypes {
    categoryHeader: string,
    label: string,
    aspect: string,
    flags: string,
    freeInvokes: boolean[],
    freeInvokesLength: number,
    notes: string,
    height: number
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
                        propertyValue: aspect.freeInvokes
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

    return (
        <div className="characterSheetBox">
            <h1>ASPECTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT ASPECTS</h2>
                        {context.aspects.map((aspect, aspectIndex) => (
                            <DragNDrop arr={ context.aspects } arrKey={ "aspects" } element={ aspect } initIndex={ aspectIndex } isVisible={ modify }>
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
                                                        key: "aspects",
                                                        value: context.aspects,
                                                        propertyKey: aspect
                                                    })}
                                                />
                                            </svg>
                                        </div>
                                        )
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
                            </DragNDrop>
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
                            freeInvokes: [false],
                            freeInvokesLength: 0,
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
                    <svg style={{ display: aspect.freeInvokesLength != 0 ? "block" : "none" }}>
                        <rect className="box" style={{ fill: invoke ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
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
    )
}

export default Aspects;