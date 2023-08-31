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
        <div className="identity" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div className="container">
                <input type="text" className="inputName" value={ context.identity.name } onChange={(e) => dispatch({
                    type: "HANDLE INPUT IDENTITY",
                    key: "name",
                    event: e.target.value
                })}/>
                <h3 className="type">NAME</h3>
            </div>
            <div className="container">
                <input type="text" className="input" value={ context.identity.pronouns } onChange={(e) => dispatch({
                    type: "HANDLE INPUT IDENTITY",
                    key: "pronouns",
                    event: e.target.value
                })}/>
                <h3 className="type">PRONOUNS</h3>
            </div>
            <div className="container">
                <input type="number" className="input" value={ context.identity.fatePoints } min={0} onChange={(e) => dispatch({
                    type: "HANDLE INPUT IDENTITY",
                    key: "fatePoints",
                    event: e.target.valueAsNumber
                })}/>
                <h3 className="type">FATE POINTS</h3>
            </div>
            <div className="container">
                <input type="number" className="input" value={ context.identity.refresh } min={0} onChange={(e) => dispatch({
                    type: "HANDLE INPUT IDENTITY",
                    key: "refresh",
                    event: e.target.valueAsNumber
                })}/>
                <h3 className="type">REFRESH</h3>
            </div>
        </div>
    )
}

export default Identity;