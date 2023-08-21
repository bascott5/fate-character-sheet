import { useState, useContext } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";

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
                <svg style={{position: "absolute", transform: "translate(145px, 8px)"}} viewBox="0 0 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>SKILLS</h1>
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