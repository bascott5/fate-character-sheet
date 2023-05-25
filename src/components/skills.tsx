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
        <div>
            <h1>SKILLS</h1>
            <button onClick={() => setSkills([...skills, {text: "", modifier: 0}])}>+</button>
            <button onClick={() => isEdit(edit => edit = !edit)}>Edit</button>
            <div>
                {edit ? 
                    skills.map(key => (
                        <div>
                            <input type="text" value={ key.text } onChange={(e) => setSkills(skills => {
                                skills = e.target.value;
                                return [...skills];
                            })} />
                            <input type="text" value={ key.modifier } onChange={(e) => setSkills(skills => {
                                skills.modifier.toString = e.target.values;
                                return [...skills];
                            })} />
                        </div>
                    ))
                :
                    skills.map(key => (
                        <div>
                            <button onClick={() => setSkills(Math.floor(Math.random() * 6) + key.modifier )}>{ key.text }: { key.modifier }</button>
                        </div>
                    ))
            }
            </div>
        </div>
    );
}

export default Skills;