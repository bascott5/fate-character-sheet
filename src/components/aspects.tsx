import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "@/components/dice";

const Aspects: React.FC = () => {
    const [aspects, setAspects] = useState([{
        name: "",
        flagged: false,
        rollable: false,
        value: 0
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: aspects });
    }, [aspects]);

    return (
        <div className="characterSheetBox">
            <h1>ASPECTS</h1>
            <button className="characterSheetButton" onClick={() => setAspects([...aspects, { name: "", flagged: false, rollable: false, value: 0 }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    aspects.map(key => (
                        <div>
                            {aspects[aspects.indexOf(key)].rollable ?
                                aspects.map(key => (
                                    <div>
                                        <button onClick={() => dice(key.value)}>{ key.name }</button>
                                    </div>
                                ))
                                :
                                aspects.map(key => (
                                    <div>
                                        <p>{ key.name }</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                :
                    aspects.map(key => (
                        <div>
                            <p>{ key.name }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Aspects;