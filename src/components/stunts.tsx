import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "./dice";
import DragNDrop from "./drag-n-drop";

export interface StuntTypes {
    name: string,
    rollable: boolean,
    bonus: number,
    skill: string,
    skillBonus: number,
    description: string,
    height: number
}

const Stunts: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        for (let i = 0; i < context.skills.length; i++) {
            if (context.skills[i].text == context.stunts[i].skill) {
                context.stunts[i].skillBonus = context.skills[i].modifier;
            } else {
                context.stunts[i].skillBonus = 0;
            }
        }
    }, [context.skills, context.stunts]);

    return (
        <div className="characterSheetBox" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <h1>STUNTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT STUNTS</h2>
                        {context.stunts.map((stunt, stuntIndex) => (
                            <DragNDrop arr={ context.stunts } arrKey={ "stunts" } element={ stunt } initIndex={ stuntIndex } isVisible={ modify }>
                                <div>
                                    {modify ? 
                                        <div>
                                            <svg>
                                                <rect 
                                                    fill="red" 
                                                    height={15} 
                                                    width={15} 
                                                    onClick={() => dispatch({
                                                        type: "DELETE OBJECT",
                                                        key: "stunts",
                                                        value: context.stunts,
                                                        propertyKey: stunt
                                                    })} 
                                                />
                                            </svg>
                                        </div>
                                        :
                                        null
                                    }
                                    <p style={{ fontWeight: "bold" }}>NAME</p>
                                    <input type="text" value={ stunt.name } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "stunts",
                                        value: context.stunts,
                                        propertyKey: "name",
                                        propertyIndex: stuntIndex,
                                        event: e.target.value
                                    })}/>
                                    <p style={{ fontWeight: "bold" }}>ROLLABLE</p>
                                    <input type="checkbox" checked={ stunt.rollable } onChange={() => dispatch({
                                        type: "TOGGLE BOX",
                                        key: "stunts",
                                        value: context.stunts,
                                        propertyKey: "rollable",
                                        propertyIndex: stuntIndex,
                                        propertyValue: stunt.rollable
                                    })}/>
                                    {stunt.rollable ? (
                                        <div>
                                            <p style={{ fontWeight: "bold" }}>BONUS</p>
                                            <input type="number" value={ stunt.bonus } onChange={(e) => dispatch({
                                                type: "HANDLE INPUT",
                                                key: "stunts",
                                                value: context.stunts,
                                                propertyKey: "bonus",
                                                propertyIndex: stuntIndex,
                                                event: e.target.valueAsNumber
                                            })}/>
                                            <p style={{ fontWeight: "bold" }}>SKILL</p>
                                            <input type="text" value={ stunt.skill } onChange={(e) => dispatch({
                                                type: "HANDLE INPUT",
                                                key: "stunts",
                                                value: context.stunts,
                                                propertyKey: "skill",
                                                propertyIndex: stuntIndex,
                                                event: e.target.value
                                            })}/>
                                        </div>
                                    )
                                        :
                                        null
                                    }
                                    <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
                                    <input type="text" value={ stunt.description } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "stunts",
                                        value: context.stunts,
                                        propertyKey: "description",
                                        propertyIndex: stuntIndex,
                                        event: e.target.value
                                    })}/>
                                </div>
                            </DragNDrop>
                        ))}
                        <button 
                            className="characterSheetButton"
                            style={{ color: context.theme.color, outlineColor: context.theme.color }}
                            onClick={() => dispatch({
                                type: "ADD OBJECT",
                                key: "stunts",
                                value: context.stunts,
                                addedValue: {
                                    name: "",
                                    rollable: false,
                                    bonus: 0,
                                    skill: "",
                                    skillBonus: 0,
                                    description: ""
                                }
                            })}>
                            +Add
                        </button>
                        <button 
                            className="characterSheetButton"
                            style={{ color: context.theme.color, outlineColor: context.theme.color }}
                            onClick={() => isModify(!modify)}>
                            Modify
                        </button>
                    </div>
                )
                    :
                    null
                }
                {context.stunts.map((stunt, stuntIndex) => (
                    <div>
                        <p style={{ fontWeight: "bold" }}>{ stunt.name }:</p> 
                        <p>{ stunt.description }</p>
                        {stunt.rollable ? (
                            <button onClick={() => dice(stunt.skillBonus + stunt.bonus)}>Roll { stunt.skill }: { stunt.skillBonus } + { stunt.bonus }</button>
                        )
                            :
                            null
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stunts;