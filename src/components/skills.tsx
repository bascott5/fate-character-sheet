import { useState, useContext } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

export interface SkillTypes {
    text: string,
    modifier: number
}

const Skills: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div style={{ margin: "0px 0px 50px 0px" }}>
                <h1 className="title" style={{ margin: "0px 0px 0px 0px" }}>SKILLS</h1>
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
                    <h2 className="title" style={{ color: "white" }}>EDIT SKILLS</h2>
                    {context.skills.map((skill, skillIndex) => (
                        <ModifyMenu arr={ context.skills } element={ skill } arrKey={ "skills" } initIndex={ skillIndex } isVisible={ modify }>
                            <div style={{  }}>
                                <input className="input" type="text" value={ skill.text } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "skills",
                                    value: context.skills,
                                    propertyKey: "text",
                                    propertyIndex: skillIndex,
                                    event: e.target.value
                                })}/>
                                <input className="input" style={{ width: "50px", margin: "0px 0px 0px 5px" }} type="number" value={ skill.modifier } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "skills",
                                    value: context.skills,
                                    propertyKey: "modifier",
                                    propertyIndex: skillIndex,
                                    event: e.target.valueAsNumber
                                })}/>
                                <p style={{ position: "relative", display: "inline-block", margin: "0px 5px 0px" }}>{
                                        skill.modifier === -4 ? "Horrifying" :
                                        skill.modifier === -3 ? "Catastrophic" :
                                        skill.modifier === -2 ? "Terrible" :
                                        skill.modifier === -1 ? "Poor" :
                                        skill.modifier === 0 ? "Mediocre" :
                                        skill.modifier === 1 ? "Average" :
                                        skill.modifier === 2 ? "Fair" :
                                        skill.modifier === 3 ? "Good" :
                                        skill.modifier === 4 ? "Great" :
                                        skill.modifier === 5 ? "Superb" :
                                        skill.modifier === 6 ? "Fantastic" :
                                        skill.modifier === 7 ? "Epic" :
                                        skill.modifier === 8 ? "Legendary" : null
                                    } &#40;{ skill.modifier > 0 ? "+" : null}{ skill.modifier }&#41;
                                </p>
                            </div>
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.skills } arrKey={ "skills" } newElement={{
                        text: "",
                        modifier: 0
                    }}/>
                </div>
            ) : null}
            {context.skills.map(skill => (
                <div style={ Object.values(skill).toString() == ",0" ? { display: "none" } : { display: "inline-block" }}>
                    <button className="button" style={edit ? { margin: "28px 10px 0px 0px", backgroundColor: context.theme.color } : { margin: "-15px 10px 0px 0px", backgroundColor: context.theme.color }} onClick={() => dice(skill.modifier)}>
                        { skill.text }{ skill.text != "" ? ": " : null } 
                            {
                                skill.modifier === -4 ? "Horrifying" :
                                skill.modifier === -3 ? "Catastrophic" :
                                skill.modifier === -2 ? "Terrible" :
                                skill.modifier === -1 ? "Poor" :
                                skill.modifier === 0 ? "Mediocre" :
                                skill.modifier === 1 ? "Average" :
                                skill.modifier === 2 ? "Fair" :
                                skill.modifier === 3 ? "Good" :
                                skill.modifier === 4 ? "Great" :
                                skill.modifier === 5 ? "Superb" :
                                skill.modifier === 6 ? "Fantastic" :
                                skill.modifier === 7 ? "Epic" :
                                skill.modifier === 8 ? "Legendary" : null
                            } &#40;{ skill.modifier > 0 ? "+" : ""}{ skill.modifier }&#41;
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Skills;