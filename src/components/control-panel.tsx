import { useContext, useEffect } from "react";
import { Context } from "./context-provider";

interface PropTypes {
    name: string | string[] | undefined
}

const ControlPanel: React.FC<PropTypes> = ({ name }: PropTypes) => {
    const [context, dispatch] = useContext(Context);

    useEffect(() => {
        if (name !== undefined) {
            dispatch({
                type: "LOAD JSON",
                name: name as string
            });
        }
    }, [name]);

    return (
        <div style={{float: "right"}}>
            <button className="button" style={{ backgroundColor: context.theme.color }} onClick={() => localStorage.setItem(context.identity.name, JSON.stringify(context))}>Save</button>
        </div>
    )
}

export default ControlPanel;