import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "@/components/dice";

interface AspectTypes {
    categoryHeader: string,
    label: string,
    aspect: string,
    flags: string,
    freeInvokes: boolean[],
    notes: string
}

const Aspects: React.FC = () => {
    const [aspects, setAspects] = useState<Array<AspectTypes>>([{
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
        dispatch({ type: "Save", payload: aspects });
        console.log(aspects);
    }, [aspects]);

    return (
        <div>
            <h1>ASPECTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT ASPECTS</h2>
                        {aspects.map((aspect, aspectIndex) => (
                            <div>
                                {modify ? 
                                    <div>
                                        <svg>
                                            <rect 
                                                fill="red" 
                                                height={15} 
                                                width={15} 
                                                onClick={() => setAspects(aspects.filter(aspectCopy => aspectCopy != aspect))} 
                                            />
                                        </svg>
                                    </div>
                                    :
                                    null
                                }
                                <h3 style={{ fontWeight: "bold" }}>CATEGORY HEADER &#40;OPTIONAL&#41;</h3>
                                <input type="text" value={ aspect.categoryHeader } onChange={(e) => setAspects(aspects => {
                                    aspects.map((aspect, localAspectIndex) => { 
                                        if (localAspectIndex === aspectIndex) {
                                            return aspect.categoryHeader = e.target.value
                                        }
                                    })
                                    return [...aspects];
                                })}
                                />
                                <h3 style={{ fontWeight: "bold" }}>LABEL</h3>
                                <input type="text" value={ aspect.label } onChange={(e) => setAspects(aspects => {
                                    let aspectsCopy = [...aspects];
                                    aspectsCopy.map(aspect => { aspect.label = e.target.value });
                                    return [...aspectsCopy];
                                })} 
                                />
                                <h3 style={{ fontWeight: "bold" }}>ASPECT</h3>
                                <input type="text" value={ aspect.aspect } onChange={(e) => setAspects(aspects => {
                                    let aspectsCopy = [...aspects];
                                    aspectsCopy.map(aspect => { aspect.aspect = e.target.value });
                                    return [...aspectsCopy];
                                })} 
                                />
                                <h3 style={{ fontWeight: "bold" }}>FLAGS</h3>
                                <input type="text" value={ aspect.flags } onChange={(e) => setAspects(aspects => {
                                    let aspectsCopy = [...aspects];
                                    aspectsCopy.map(aspect => { aspect.flags = e.target.value });
                                    return [...aspectsCopy];
                                })} 
                                />
                                <h3 style={{ fontWeight: "bold" }}>FREE INVOKES</h3>
                                <input type="number" value={ aspect.freeInvokes.length } max={10} min={0} onChange={(e) => setAspects(aspects => {
                                    let aspectsCopy = [...aspects];
                                    aspectsCopy.map(aspect => { 
                                        aspect.freeInvokes.length = e.target.valueAsNumber
                                        for (let i = 0; i < aspect.freeInvokes.length; i++) {
                                            /*if (aspect.freeInvokes[i] == undefined) {
                                                aspects.replace(i, 0, [...aspect.freeInvokes, false]);
                                            }*/
                                        }
                                        return [...aspect.freeInvokes];
                                    });
                                    return [...aspectsCopy];
                                })} 
                                />
                                <h3 style={{ fontWeight: "bold" }}>NOTES</h3>
                                <input type="text" value={ aspect.notes } onChange={(e) => setAspects(aspects => {
                                    let aspectsCopy = [...aspects];
                                    aspectsCopy.map(aspect => { aspect.notes = e.target.value });
                                    return [...aspectsCopy];
                                })} 
                                />
                            </div>
                        ))}
                        <button 
                    className="characterSheetButton" 
                    onClick={() => setAspects([...aspects, { 
                        categoryHeader: "", 
                        label: "", 
                        aspect: "", 
                        flags: "", 
                        freeInvokes: [], 
                        notes: ""
                    }])} 
                >
                    +Add
                </button>
                <button 
                    className="characterSheetButton"
                    onClick={() => isModify(!modify)}
                >
                    Modify
                </button>
                    </div>
                )
                    :
                    null
                }
            {aspects.map((aspect, aspectIndex) => (
                <div>
                    <h3 style={{ fontWeight: "bold" }}>{ aspect.categoryHeader.toUpperCase() }</h3>
                    <p style={{ color: "blue", fontWeight: "bold" }}>{ aspect.label.toUpperCase() }</p>
                    <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{ aspect.aspect }</p> <p style={aspect.flags.length == 0 ? { display: "none" } : { display: "inline-block" } }>&#40;{ aspect.flags }&#41;</p>
                    <p>{ aspect.notes.toUpperCase() }</p>
                    {aspect.freeInvokes.map((invoke, invokeIndex) => (
                    <svg>
                        <rect className="box" style={{ fill: invoke ? "blue" : "white" }} height={25} width={25} onClick={() => setAspects(aspects =>
                            aspects.map((aspect, localAspectIndex) => {
                            if (localAspectIndex === aspectIndex) {
                                return {
                                    ...aspect,
                                    boxes: aspect.freeInvokes.map(
                                    (invoke, localInvokeIndex) => {
                                        if (localInvokeIndex === invokeIndex) {
                                            return !invoke;
                                        }
                                    return invoke;
                                        }
                                    ),
                                };
                            }
                            return aspect;
                        })
                    )} 
                    />
                    </svg>
                ))}
                </div>
            ))}
            </div>
        </div>
    )
}

export default Aspects;