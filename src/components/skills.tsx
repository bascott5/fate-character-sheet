import { useState, useContext, useEffect } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";
import DragNDrop from "@/components/drag-n-drop";

const Skills: React.FC = () => {
	const [skills, setSkills] = useState([{
		text: "",
		modifier: 0
	}]);
    const [edit, isEdit] = useState<boolean>(false);
    // add feature that allows user to change the place of a skill in an array via drag-and-drop
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: skills });
    }, [skills]);

	return (
        <div className="characterSheetBox">
            <h1>SKILLS</h1>
            <button className="characterSheetButton" onClick={() => setSkills([...skills, { text: "", modifier: 0 }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ? 
                    skills.map((key, index) => (
                        <div>
                            <DragNDrop arr={ skills } key={ key } initIndex={ index } />
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