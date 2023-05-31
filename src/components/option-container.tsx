"use client"
import { useContext, useState } from "react";
import { Context } from "./context-provider";
import Skills from "@/components/skills";
import Notes from "@/components/notes";
import Stress from "@/components/stress";
import Aspects from "@/components/aspects";
import Stunts from "@/components/stunts";

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
                {options.isSkills ? <Skills /> : null}
                {options.isStunts ? <Stunts /> : null}
                {options.isNotes ? <Notes /> : null}
            </div>
            <div className="secondColumn">
                {options.isAspects ? <Aspects /> : null}
                {options.isStress ? <Stress /> : null}
            </div>
        </div>
    )
}

export default OptionContainer;