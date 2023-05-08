import { useContext } from "react";
import { Context } from "./context-provider";

const OptionContainer: React.FC = () => {
    let [context, dispatch] = useContext(Context);

    return Object.entries(context).slice(0, 5).map((key, value) => (
        <button onClick={() => dispatch({ type: "toggle", payload: value })}>{ key } { value }</button>
    ));
}

export default OptionContainer;