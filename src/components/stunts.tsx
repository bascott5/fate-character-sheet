import { useState, useContext } from "react";
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

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div style={{ margin: "0px 0px 50px 0px" }}>
                <h1 className="title" style={{ margin: "0px 0px 0px 0px" }}>STUNTS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
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
                                <input style={{ margin: "0px 0px 15px 0px" }} type="checkbox" checked={ stunt.rollable } onChange={() => dispatch({
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
                                        <input className="input" type="number" value={ stunt.bonus } onChange={(e) => {
                                            dispatch({
                                                type: "HANDLE INPUT",
                                                key: "stunts",
                                                value: context.stunts,
                                                propertyKey: "bonus",
                                                propertyIndex: stuntIndex,
                                                event: e.target.valueAsNumber
                                            });
                                            dispatch({ type: "CHANGE SKILL BONUS" });
                                        }}/>
                                        <p className="headerText">SKILL</p>
                                        <input className="input" type="text" value={ stunt.skill } onChange={(e) => {
                                            dispatch({
                                                type: "HANDLE INPUT",
                                                key: "stunts",
                                                value: context.stunts,
                                                propertyKey: "skill",
                                                propertyIndex: stuntIndex,
                                                event: e.target.value
                                            });
                                            dispatch({ type: "CHANGE SKILL BONUS" });
                                        }}/>
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
            {context.stunts.map(stunt => (
                <div style={ Object.values(stunt).toString() == ",false,0,,0," ? { display: "none" } : edit ? { margin: "10px 0px 0px 0px" } : { margin: "-45px 0px 50px 0px" }}>
                    <p style={{ display: "inline-block", fontWeight: "bold" }}>{ stunt.name }{ stunt.name != "" ? ": " : null }</p> <p className="paragraph" style={{ display: "inline-block" }}>{ stunt.description }</p>
                    {stunt.rollable ? (
                        <button className="button" style={{ display: "block", margin: "0px 0px 0px 0px", backgroundColor: context.theme.color }} onClick={() => dice(stunt.skillBonus + stunt.bonus)}>{ stunt.skill }{ stunt.skill != "" ? ": " : null } { stunt.bonus } { stunt.skillBonus >= 0 ? "+" : "-" } { stunt.skillBonus >= 0 ? stunt.skillBonus : -stunt.skillBonus }</button>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Stunts;