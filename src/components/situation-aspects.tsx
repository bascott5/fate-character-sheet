import { useState, useEffect, useContext } from "react"
import { Context } from "./context-provider"
import DragNDrop from "./drag-n-drop"

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
        <div className="characterSheetBox">
            <h1>SITUATION ASPECTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT ASPECTS</h2>
                        {context.situationAspects.map((aspect, aspectIndex) => (
                            <DragNDrop arr={ context.situationAspects } arrKey={ "situationAspects" } element={ aspect } initIndex={ aspectIndex } isVisible={ modify }>
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
                                                    key: "situationAspects",
                                                    value: context.situationAspects,
                                                    propertyKey: aspect
                                                })}
                                            />
                                        </svg>
                                    </div>
                                    )
                                    :
                                    null
                                }
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
                            </DragNDrop>
                        ))}
                        <button 
                        className="characterSheetButton" 
                        onClick={() => dispatch({
                        type: "ADD OBJECT",
                        key: "situationAspects",
                        value: context.situationAspects,
                        addedValue: {
                            aspect: "",
                            freeInvokes: [],
                            freeInvokeLength: 0,
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
                ) : null}
                {context.situationAspects.map((aspect, aspectIndex) => (
                    <div>
                        <h3 style={{ fontWeight: "bold" }}>{ aspect.aspect }</h3>
                        <p>{ aspect.notes }</p>
                        {aspect.freeInvokes.map((invoke, invokeIndex) => (
                            <svg style={{ display: aspect.freeInvokesLength != 0 ? "block" : "none" }}>
                                <rect className="box" style={{ fill: invoke ? "blue" : "white" }} height={25} width={25} onClick={() => dispatch({
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
        </div>
    )
}

export default SituationAspects