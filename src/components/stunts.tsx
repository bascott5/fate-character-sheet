import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "./dice";

interface StuntTypes {
    name: string,
    rollable: boolean,
    bonus: number,
    skill: string,
    skillBonus: number,
    description: string
}

const Stunts: React.FC = () => {
    const [stunts, setStunts] = useState<Array<StuntTypes>>([{
        name: "",
        rollable: false,
        bonus: 0,
        skill: "",
        skillBonus: 0,
        description: ""
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: stunts });
        /*for (let i = 0; i < context.skills.names; i++) {
            if (context.skills.names[i] == stunt.skill) {
                return stunt.skillBonus == context.skills.modifier;
            }
        }*/
    }, [stunts]);

    return (
        <div className="characterSheetBox">
            <h1>STUNTS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT STUNTS</h2>
                        {stunts.map((stunt, stuntIndex) => (
                            <div>
                                {modify ? 
                                    <div>
                                        <svg>
                                            <rect 
                                                fill="red" 
                                                height={15} 
                                                width={15} 
                                                onClick={() => setStunts(stunts.filter(stuntCopy => stuntCopy != stunt))} 
                                            />
                                        </svg>
                                    </div>
                                    :
                                    null
                                }
                                <p style={{ fontWeight: "bold" }}>NAME</p>
                                <input type="text" value={ stunt.name } onChange={(e) => setStunts(stunts => {
                                    stunts.map((stunt, localStuntIndex) => { 
                                        if (localStuntIndex === stuntIndex) {
                                            return stunt.name = e.target.value;
                                        }
                                    });
                                    return [...stunts];
                                })}/>
                                <p style={{ fontWeight: "bold" }}>ROLLABLE</p>
                                <input type="checkbox" checked={ stunt.rollable } onChange={() => setStunts(stunts => {
                                    stunts.map((stunt, localStuntIndex) => {
                                        //if (localStuntIndex === stuntIndex) {
                                            return {
                                                ...stunt,
                                                rollable: !stunt.rollable 
                                            }
                                        //}
                                    });
                                    return [...stunts];
                                })}/>
                                {stunt.rollable ? (
                                    <div>
                                        <p style={{ fontWeight: "bold" }}>BONUS</p>
                                        <input type="number" value={ stunt.bonus } onChange={(e) => setStunts(stunts => {
                                            stunts.map((stunt, localStuntIndex) => { 
                                                if (localStuntIndex === stuntIndex) {
                                                    return stunt.bonus = e.target.valueAsNumber;
                                                }
                                            });
                                            return [...stunts];
                                        })} />
                                        <p style={{ fontWeight: "bold" }}>SKILL</p>
                                        <input type="text" value={ stunt.skill } onChange={(e) => setStunts(stunts => {
                                            stunts.map((stunt, localStuntIndex) => { 
                                                if (localStuntIndex === stuntIndex) {
                                                    return stunt.skill = e.target.value;
                                                }
                                            });
                                            return [...stunts];
                                        })}/>
                                    </div>
                                )
                                    :
                                    null
                                }
                                <p style={{ fontWeight: "bold" }}>DESCRIPTION</p>
                                <input type="text" value={ stunt.description } onChange={(e) => setStunts(stunts => {
                                    stunts.map((stunt, localStuntIndex) => { 
                                        if (localStuntIndex === stuntIndex) {
                                            return stunt.description = e.target.value;
                                        }
                                    });
                                    return [...stunts];
                                })} 
                                />
                            </div>
                        ))}
                        <button 
                            className="characterSheetButton" 
                            onClick={() => setStunts([...stunts, { 
                            name: "",
                            rollable: false,
                            bonus: 0,
                            skill: "",
                            skillBonus: 0,
                            description: ""
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
                {stunts.map((stunt, stuntIndex) => (
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

    return (
        <div className="characterSheetBox">
            <h1>STUNTS</h1>
            <button className="characterSheetButton" onClick={() => setStunts([...stunts, { name: "", description: "" }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stunts.map(key => (
                        <div>
                            <input type="text" value={ key.name } onChange={(e) => setStunts(stunts => {
                                key.name = e.target.value;
                                return [...stunts];
                            })} />
                            <input type="text" value={ key.description } onChange={(e) => setStunts(stunts => {
                                key.description = e.target.value;
                                return [...stunts];
                            })} />
                        </div>
                    ))
                :
                    stunts.map(key => (
                        <div>
                            <h3>{ key.name }</h3>
                            <p>{ key.description }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stunts;