import { useContext } from "react";
import { Context } from "./context-provider";

const ControlPanel: React.FC = () => {
    const [context, dispatch] = useContext(Context);

    return (
        <div style={{float: "right"}}>
            <button className={"button"} style={{ backgroundColor: context.theme.color }} onClick={() => localStorage.setItem(context.identity.name, JSON.stringify(context))}>Save</button>
        </div>
    )
}

export default ControlPanel;