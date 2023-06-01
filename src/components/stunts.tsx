import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";

const Stunts: React.FC = () => {
    const [stunts, setStunts] = useState([{
        name: "",
        description: ""
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: stunts });
    }, [stunts]);

    return (
        <div className="characterSheetBox">
            <h1>STUNTS</h1>
            <button className="characterSheetButton" onClick={() => setStunts([...stunts, { name: "", description: "" }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    stunts.map(key => (
                        <div>
                            <input type="text" value={ key.name } onChange={(e) => setStunts(stunts => {
                                key.name = e.target.value;
                                return [...stunts];
                            })} />
                            <input type="text" value={ key.description } onChange={(e) => setStunts(stunts => {
                                key.description = e.target.value;
                                return [...stunts];
                            })} />
                        </div>
                    ))
                :
                    stunts.map(key => (
                        <div>
                            <h3>{ key.name }</h3>
                            <p>{ key.description }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Stunts;