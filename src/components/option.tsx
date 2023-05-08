import { useContext } from "react";
import { Context } from "./context-provider";

const Option: React.FC<any> = (title: any) => {
    let [context, dispatch] = useContext(Context);
    
    return (
        <button onClick={() => dispatch({ type: "toggle", payload: context[title] })}>{ title }</button>
    )
}

export default Option;