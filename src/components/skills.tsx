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
            <div>
                <h1>SKILLS</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    style={{ margin: "-56px 0px 0px 145px" }}
                    src={
                        context.theme.theme == "Blue" ? blueedit :
                        context.theme.theme == "Red" ? rededit :
                        context.theme.theme == "Green" ? greenedit :
                        context.theme.theme == "Purple" ? purpleedit :
                        null
                    }
                    alt="Edit!"
                    width={30}
                    height={30}
                    onClick={() => isEdit(!edit)}
                />
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT SKILLS</h2>
                    {context.skills.map((skill, skillIndex) => (
                        <ModifyMenu arr={ context.skills } element={ skill } arrKey={ "skills" } initIndex={ skillIndex } isVisible={ modify }>
                            <div>
                                <input className="input" type="text" value={ skill.text } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "skills",
                                    value: context.skills,
                                    propertyKey: "text",
                                    propertyIndex: skillIndex,
                                    event: e.target.value
                                })}/>
                                <input className="input" type="number" value={ skill.modifier } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "skills",
                                    value: context.skills,
                                    propertyKey: "modifier",
                                    propertyIndex: skillIndex,
                                    event: e.target.valueAsNumber
                                })}/>
                                <p>
                                    {
                                        skill.modifier === -4 ? "Horrifying (-4)" :
                                        skill.modifier === -3 ? "Catastrophic (-3)" :
                                        skill.modifier === -2 ? "Terrible (-2)" :
                                        skill.modifier === -1 ? "Poor (-1)" :
                                        skill.modifier === 0 ? "Mediocre (0)" :
                                        skill.modifier === 1 ? "Average (+1)" :
                                        skill.modifier === 2 ? "Fair (+2)" :
                                        skill.modifier === 3 ? "Good (+3)" :
                                        skill.modifier === 4 ? "Great (+4)" :
                                        skill.modifier === 5 ? "Superb (+5)" :
                                        skill.modifier === 6 ? "Fantastic (+6)" :
                                        skill.modifier === 7 ? "Epic (+7)" :
                                        skill.modifier === 8 ? "Legendary (+8)" : null
                                    }
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
                <div>
                    <button className="button" style={{ backgroundColor: context.theme.color }} onClick={() => dice(skill.modifier)}>
                        {skill.text}: {
                            skill.modifier === -4 ? "Horrifying (-4)" :
                            skill.modifier === -3 ? "Catastrophic (-3)" :
                            skill.modifier === -2 ? "Terrible (-2)" :
                            skill.modifier === -1 ? "Poor (-1)" :
                            skill.modifier === 0 ? "Mediocre (0)" :
                            skill.modifier === 1 ? "Average (+1)" :
                            skill.modifier === 2 ? "Fair (+2)" :
                            skill.modifier === 3 ? "Good (+3)" :
                            skill.modifier === 4 ? "Great (+4)" :
                            skill.modifier === 5 ? "Superb (+5)" :
                            skill.modifier === 6 ? "Fantastic (+6)" :
                            skill.modifier === 7 ? "Epic (+7)" :
                            skill.modifier === 8 ? "Legendary (+8)" : null
                        }
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Skills;