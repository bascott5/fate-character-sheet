import Notes from "./notes";
import { useContext, useState } from "react";
import { Context } from "./context-provider";

const OptionContainer: React.FC = () => {
    let [options, setOptions] = useState({
        isAspects: false,
        isSkills: false,
        isStunts: false,
        isStress: false,
        isNotes: false
    });
    let [context, dispatch] = useContext(Context);

    return (
        <div>
            {Object.entries(options).map(([key, value]) => (
                <button onClick={() => setOptions(options => ({
                    ...options, [key]: !value}))}>{ key.substring(2) }: { value.toString() } 
                </button>
            ))}
            <div className="firstColumn">
                {options.isSkills ? null : null}
                {options.isStunts ? null : null}
                {options.isNotes ? <Notes /> : null}
            </div>
            <div className="secondColumn">
                {options.isAspects ? null : null}
                {options.isStress ? null : null}
            </div>
        </div>
    )
}

export default OptionContainer;