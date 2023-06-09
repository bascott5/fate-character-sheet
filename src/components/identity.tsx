import { Context } from "./context-provider";
import { useContext } from "react";

export interface IdentityTypes {
    "name": string,
    "pronouns": string,
    "fatePoints": number,
    "refresh": number
}

const Identity: React.FC = () => {
    let [context, dispatch] = useContext(Context);

    return (
        <div className="identity">
           <input type="text" className="" value={ context.identity.name } onChange={(e) => dispatch({
                type: "HANDLE INPUT IDENTITY",
                key: "name",
                event: e.target.value
            })}/>
            <input type="text" value={ context.identity.pronouns } onChange={(e) => dispatch({
                type: "HANDLE INPUT IDENTITY",
                key: "pronouns",
                event: e.target.value
            })}/>
            <h3 className="type">PRONOUNS</h3>
            <input type="number" value={ context.identity.fatePoints } min={0} onChange={(e) => dispatch({
                type: "HANDLE INPUT IDENTITY",
                key: "fatePoints",
                event: e.target.valueAsNumber
            })}/>
            <h3 className="type">FATE POINTS</h3>
            <input type="number" value={ context.identity.refresh } min={0} onChange={(e) => dispatch({
                type: "HANDLE INPUT IDENTITY",
                key: "refresh",
                event: e.target.valueAsNumber
            })}/>
            <h3 className="type">REFRESH</h3>
        </div>
    )
}

export default Identity;