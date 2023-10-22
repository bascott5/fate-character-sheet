import Link from "next/link";
import { useContext, useEffect } from "react";
import { Context } from "./context-provider";
import DropdownTwo from "./dropdown02";

interface PropTypes {
    name: string | string[] | undefined
}

const ControlPanel: React.FC<PropTypes> = ({ name }: PropTypes) => {
    const [context, dispatch] = useContext(Context);
    const themes = [
        { theme: "Blue", color: "cornflowerblue" }, 
        { theme: "Red", color: "tomato" }, 
        //{ theme: "Green", color: "springgreen" }, 
        { theme: "Purple", color: "violet" }
    ];

    useEffect(() => {
        if (name !== undefined) {
            dispatch({
                type: "LOAD JSON",
                name: name as string
            });
        }
    }, [name]);

    // TODO: include load inside the control panel
    return (
        <div className="controlPanel">
            <DropdownTwo title={ "Themes" } arr={ themes } func={(element) => dispatch({
                type: "SET THEME",
                payload: { theme: element.theme, color: element.color }
            })} />
            <button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }} onClick={() => localStorage.setItem(context.identity.name, JSON.stringify(context))}>Save</button>
            <Link href={ "/content/characters" }><button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }}>Load</button></Link>
        </div>
    )
}

export default ControlPanel;