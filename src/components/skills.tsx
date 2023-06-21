//https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
import { useState, useContext, useRef, useEffect } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";
import DragNDrop from "@/components/drag-n-drop";

export interface SkillsInterface {
    text: string,
    modifier: number
}

const Skills: React.FC = () => {
	const [skills, setSkills] = useState<Array<SkillsInterface>>([{
		text: "",
		modifier: 0
	}]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: skills });
    }, [skills]);

    return (
        <div className="characterSheetBox">
            <h1 style={{ fontWeight: "bold" }}>SKILLS</h1>
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT SKILLS</h2>
                        {skills.map((skill, skillIndex) => (
                            <div>
                                <DragNDrop arr={ skills } initIndex={ skillIndex }>
                                {modify ? (
                                    <div>
                                        <svg>
                                            <rect 
                                                fill="red" 
                                                height={15} 
                                                width={15} 
                                                onClick={() => setSkills(skills.filter(skillCopy => skillCopy != skill))} 
                                            />
                                        </svg>
                                    </div>
                                )
                                :
                                null
                                }
                                </DragNDrop>
                            </div>
                        ))}
                    </div>
                )
                    :
                    null
                }
            </div>
        </div>
    )

	return (
        <div className="characterSheetBox">
            <h1>SKILLS</h1>
            <button className="characterSheetButton" onClick={() => setSkills([...skills, { text: "", modifier: 0 }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ? 
                    skills.map((key, index) => (
                        <div>
                            <DragNDrop arr={ skills } initIndex={ index }>
                                <input type="text" value={ key.text } onChange={(e) => setSkills(skills => {
                                    key.text = e.target.value;
                                    return [...skills];
                                })} />
                                <input type="number" value={ key.modifier } min={-10} max={10} onChange={(e) => setSkills(skills => {
                                    key.modifier = e.target.valueAsNumber;
                                    return [...skills];
                                })} />
                                <p>
                                    {
                                        key.modifier === -4 ? "Horrifying (-4)" :
                                        key.modifier === -3 ? "Catastrophic (-3)" :
                                        key.modifier === -2 ? "Terrible (-2)" :
                                        key.modifier === -1 ? "Poor (-1)" :
                                        key.modifier === 0 ? "Mediocre (0)" :
                                        key.modifier === 1 ? "Average (+1)" :
                                        key.modifier === 2 ? "Fair (+2)" :
                                        key.modifier === 3 ? "Good (+3)" :
                                        key.modifier === 4 ? "Great (+4)" :
                                        key.modifier === 5 ? "Superb (+5)" :
                                        key.modifier === 6 ? "Fantastic (+6)" :
                                        key.modifier === 7 ? "Epic (+7)" :
                                        key.modifier === 8 ? "Legendary (+8)" : null
                                    }
                                </p>
                            </DragNDrop>
                        </div>
                    ))
                :
                    skills.map(key => (
                        <div>
                            <button onClick={() => dice(key.modifier)}>
                                { key.text }: { key.modifier }
                            </button>
                        </div>
                    ))
            }
            </div>
        </div>
    );
}

export default Skills;