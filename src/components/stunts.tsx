import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "./dice";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";

export interface StuntTypes {
    name: string,
    rollable: boolean,
    bonus: number,
    skill: string,
    skillBonus: number,
    description: string
}

const Stunts: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        if (context.skills.length > 0 && context.stunts.length > 0) {
            dispatch({ type: "CHANGE SKILL BONUS" })
        }
    }, [context.skills, context.stunts]);

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <svg style={{position: "absolute", transform: "translate(163px, 8px)"}} viewBox="0 0 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>STUNTS</h1>
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT STUNTS</h2>
                    {context.stunts.map((stunt, stuntIndex) => (
                        <ModifyMenu arr={ context.stunts } element={ stunt } arrKey={ "stunts" } initIndex={ stuntIndex } isVisible={ modify }>
                            <div>
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
                                ) : null}
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
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.stunts } arrKey={ "stunts" } newElement={{
                        name: "",
                        rollable: false,
                        bonus: 0,
                        skill: "",
                        skillBonus: 0,
                        description: ""
                    }}/>
                </div>
            ) : null}
            {context.stunts.map((stunt, stuntIndex) => (
                <div>
                    <p style={{ fontWeight: "bold" }}>{ stunt.name }:</p> 
                    <p>{ stunt.description }</p>
                    {stunt.rollable ? (
                        <button className="button" style={{ backgroundColor: context.theme.color }} onClick={() => dice(stunt.skillBonus + stunt.bonus)}>Roll { stunt.skill }: { stunt.bonus } + { stunt.skillBonus }</button>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Stunts;