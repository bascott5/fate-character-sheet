//https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
import { useState, useContext } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";
import DragNDrop from "@/components/drag-n-drop";

export interface SkillTypes {
    text: string,
    modifier: number
}

const Skills: React.FC = () => {
	const [skills, setSkills] = useState<SkillTypes[]>([{
		text: "",
		modifier: 0
	}]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="characterSheetBox">
            <h1>SKILLS</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT SKILLS</h2>
                        {context.skills.map((skill, skillIndex) => (
                            <DragNDrop arr={ context.skills } initIndex={ skillIndex } isVisible={ modify }>
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
                                                        key: "skills",
                                                        value: context.skills,
                                                        propertyKey: skill
                                                    })} 
                                                />
                                            </svg>
                                        </div>
                                    )
                                    :
                                    null
                                    }
                                    <input type="text" value={ skill.text } onChange={(e) => dispatch({
                                        type: "HANDLE INPUT",
                                        key: "skills",
                                        value: context.skills,
                                        propertyKey: "text",
                                        propertyIndex: skillIndex,
                                        event: e.target.value
                                    })}/>
                                    <input type="number" value={ skill.modifier } onChange={(e) => dispatch({
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
                            </DragNDrop>
                        ))}
                        <button 
                            className="characterSheetButton" 
                            onClick={() => dispatch({
                                type: "ADD OBJECT",
                                key: "skills",
                                value: context.skills,
                                addedValue: {
                                    text: "",
		                            modifier: 0
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
                )
                    :
                    null
                }
                {context.skills.map((skill, skillIndex) => (
                    <div>
                        <button className="characterSheetButton" onClick={() => dice(skill.modifier)}>
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
        </div>
    )
}

export default Skills;