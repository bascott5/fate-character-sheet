import { useState, useContext } from "react"
import { Context } from "@/components/context-provider";

const Skills: React.FC = () => {
	const [skills, setSkills] = useState([{
		text: "",
		modifier: 0
	}]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);
	//context["skills"] = [...skills];

	return (
        <div className="characterSheetBox">
            <h1>SKILLS</h1>
            <button onClick={() => setSkills([...skills, {text: "", modifier: 0}])}>+</button>
            <button onClick={() => isEdit(!edit)}>Edit</button>
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
                            <button onClick={() => setSkills(skills => {
                                Math.floor(Math.random() * 6) + key.modifier
                                return [...skills];
                                })}>
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