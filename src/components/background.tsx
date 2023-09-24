import { Context } from "./context-provider";
import { useContext } from "react";

const Background: React.FC = () => {
    let [context, dispatch] = useContext(Context);

    return (
        <div className="background" style={{ background: "linear-gradient(90deg, " + context.theme.color + " 0%, white 5%, white 95%, " + context.theme.color + " 100%)" }} />
    )
}

export default Background;