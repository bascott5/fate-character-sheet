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
import SituationAspects from "./situation-aspects";
import Identity from "./identity";
import DropdownTwo from "./dropdown02";

export interface ThemeTypes {
    theme: string,
    color: string
}

const OptionContainer: React.FC = () => {
    let [context, dispatch] = useContext(Context);
    const themes = [
        {theme: "Blue", color: "cornflowerblue" }, 
        {theme: "Red", color: "tomato" }, 
        {theme: "Green", color: "lightgreen" }, 
        {theme: "Purple", color: "plum" }
    ]

    return (
        <div>
            {Object.entries(context.options).map(([key, value]) => (
                <button className="button" style={{ backgroundColor: context.theme.color }} onClick={() => dispatch({ 
                    type: "TOGGLE", 
                    key: key, 
                    value: value })}>
                    { key.substring(2) }: { value.toString() } 
                </button>
            ))}
            <DropdownTwo title={ "Themes" } arr={ themes } func={(element) => dispatch({
                type: "SET THEME",
                payload: { theme: element.theme, color: element.color }
            })} />
            <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
                <Identity />
                <div className="firstColumn">
                    {context.options.isSkills ? <Skills /> : null}
                    {context.options.isStunts ? <Stunts /> : null}
                    {context.options.isNotes ? <Notes /> : null}
                </div>
                <div className="secondColumn">
                    {context.options.isAspects ? <Aspects /> : null}
                    {context.options.isStress ? <Stress /> : null}
                    {context.options.isConsequences ? <Consequences /> : null}
                    {context.options.isConditions ? <Conditions /> : null}
                    {context.options.isSituationAspects ? <SituationAspects /> : null}
                </div>
            </div>
        </div>
    )
}

export default OptionContainer;