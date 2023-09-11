import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "./dice";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

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
                <h1 className="title">STUNTS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-54px 0px 0px 153px" }}
                    src={
                        context.theme.theme == "Blue" ? blueedit :
                        context.theme.theme == "Red" ? rededit :
                        context.theme.theme == "Green" ? greenedit :
                        context.theme.theme == "Purple" ? purpleedit :
                        null
                    }
                    alt="Edit!"
                    width={25}
                    height={25}
                    onClick={() => isEdit(!edit)}
                />
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 className="title" style={{ color: "white" }}>EDIT STUNTS</h2>
                    {context.stunts.map((stunt, stuntIndex) => (
                        <ModifyMenu arr={ context.stunts } element={ stunt } arrKey={ "stunts" } initIndex={ stuntIndex } isVisible={ modify }>
                            <div>
                                <p className="headerText">NAME</p>
                                <input className="input" type="text" value={ stunt.name } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "stunts",
                                    value: context.stunts,
                                    propertyKey: "name",
                                    propertyIndex: stuntIndex,
                                    event: e.target.value
                                })}/>
                                <p className="headerText">ROLLABLE</p>
                                <input className="input" type="checkbox" checked={ stunt.rollable } onChange={() => dispatch({
                                    type: "TOGGLE BOX",
                                    key: "stunts",
                                    value: context.stunts,
                                    propertyKey: "rollable",
                                    propertyIndex: stuntIndex,
                                    propertyValue: stunt.rollable
                                })}/>
                                {stunt.rollable ? (
                                    <div>
                                        <p className="headerText">BONUS</p>
                                        <input className="input" type="number" value={ stunt.bonus } onChange={(e) => dispatch({
                                            type: "HANDLE INPUT",
                                            key: "stunts",
                                            value: context.stunts,
                                            propertyKey: "bonus",
                                            propertyIndex: stuntIndex,
                                            event: e.target.valueAsNumber
                                        })}/>
                                        <p className="headerText">SKILL</p>
                                        <input className="input" type="text" value={ stunt.skill } onChange={(e) => dispatch({
                                            type: "HANDLE INPUT",
                                            key: "stunts",
                                            value: context.stunts,
                                            propertyKey: "skill",
                                            propertyIndex: stuntIndex,
                                            event: e.target.value
                                        })}/>
                                    </div>
                                ) : null}
                                <p className="headerText">DESCRIPTION</p>
                                <input className="input" type="text" value={ stunt.description } onChange={(e) => dispatch({
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
                    <p className="header">{ stunt.name }:</p> 
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