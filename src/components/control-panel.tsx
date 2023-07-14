import { useContext } from "react";
import { Context } from "./context-provider";

const ControlPanel: React.FC = () => {
    const [context, dispatch] = useContext(Context)

    return (
        <div>
            <button onClick={() => localStorage.setItem("0", JSON.stringify(context))/*dispatch({ type: "WRITE JSON", name: context.identity.name })*/}>Save</button>
            <button onClick={() => dispatch({ type: "LOAD JSON", name: context.identity.name })}>Load</button>
        </div>
    )
}

export default ControlPanel;