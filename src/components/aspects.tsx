import { useState, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import Delete from "./delete";
import AddModify from "./add-modify";
import ChangeIndex from "./change-index";

export interface AspectTypes {
    categoryHeader: string,
    label: string,
    aspect: string,
    flags: string,
    freeInvokes: boolean[],
    freeInvokesLength: number,
    notes: string //TODO: turn change index and delete into one component called modify
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

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <svg style={{position: "absolute"}} viewBox="-160 -7 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>ASPECTS</h1>
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                <h2 style={{ color: "white" }}>EDIT ASPECTS</h2>
                    {context.aspects.map((aspect, aspectIndex) => (
                        <ChangeIndex arr={ context.aspects } arrKey={ "aspects" } initIndex={ aspectIndex } isVisible={ modify }>
                            <div>
                                {modify ? (
                                    <Delete arr={ context.aspects } arrKey={ "aspects" } element={ aspect } />
                                ) : null}
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
                        </ChangeIndex>
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
            {context.aspects.map((aspect, aspectIndex) => (
                <div>
                    <h3 style={{ fontWeight: "bold" }}>{ aspect.categoryHeader.toUpperCase() }</h3>
                    <p style={{ color: "blue", fontWeight: "bold" }}>{ aspect.label.toUpperCase() }</p>
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
    )
}

export default Aspects;