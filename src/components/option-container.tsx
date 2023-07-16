"use client"
import { useContext, useState } from "react";
import { Context } from "./context-provider";
import Skills from "@/components/skills";
import Notes from "@/components/notes";
import Stress from "@/components/stress";
import Aspects from "@/components/aspects";
import Stunts from "@/components/stunts";
import Consequences from "./consequences";
import Conditions from "./conditions";

const OptionContainer: React.FC = () => {
    let [context, dispatch] = useContext(Context);

    return (
        <div>
            {Object.entries(context.options).map(([key, value]) => (
                <button className="characterSheetButton" onClick={() => dispatch({ 
                    type: "TOGGLE", 
                    key: key, 
                    value: value })}>
                    { key.substring(2) }: { value.toString() } 
                </button>
            ))}
            <div className="firstColumn">
                {context.options.isSkills ? <Skills /> : null}
                {context.options.isStunts ? <Stunts /> : null}
                {context.options.isNotes ? <Notes /> : null}
            </div>
            <div className="secondColumn">
                {context.options.isAspects ? <Aspects /> : null}
                {context.options.isConsequences ? <Consequences /> : null}
                {context.options.isConditions ? <Conditions /> : null}
                {context.options.isStress ? <Stress /> : null}
                {}
            </div>
        </div>
    )
}

export default OptionContainer;