import { useState, useContext, useEffect } from "react"
import { Context } from "@/components/context-provider";
import { dice } from "@/components/dice";

const Skills: React.FC = () => {
	const [skills, setSkills] = useState([{
		text: "",
		modifier: 0
	}]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: skills });
    }, [skills]);

	return (
        <div className="characterSheetBox">
            <h1>SKILLS</h1>
            <button className="characterSheetButton" onClick={() => setSkills([...skills, {text: "", modifier: 0}])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ? 
                    skills.map(key => (
                        <div>
                            <input type="text" value={ key.text } onChange={(e) => setSkills(skills => {
                                key.text = e.target.value;
                                return [...skills];
                            })} />
                            <input type="number" value={ key.modifier } min={-10} max={10} onChange={(e) => setSkills(skills => {
                                key.modifier = e.target.valueAsNumber;
                                return [...skills];
                            })} />
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