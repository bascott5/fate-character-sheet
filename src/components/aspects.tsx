import { useState, useEffect, useContext } from "react";
import { Context } from "./context-provider";
import { dice } from "@/components/dice";

const Aspects: React.FC = () => {
    const [aspects, setAspects] = useState([{
        categoryHeader: "",
        label: "",
        aspect: "",
        flagged: false,
        rollable: false,
        freeInvokes: 0
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: "Save", payload: aspects });
    }, [aspects]);

    return (
        <div className="characterSheetBox">
            <h1>ASPECTS</h1>
            <button className="characterSheetButton" onClick={() => setAspects([...aspects, { categoryHeader: "", label: "", aspect: "", flagged: false, rollable: false, freeInvokes: 0 }])}>+</button>
            <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    aspects.map(key => (
                        <div>
                            {aspects[aspects.indexOf(key)].rollable ?
                                aspects.map(key => (
                                    <div>
                                        <button onClick={() => dice(key.freeInvokes)}>{ key.aspect }</button>
                                    </div>
                                ))
                                :
                                aspects.map(key => (
                                    <div>
                                        <p>{ key.aspect }</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                :
                    aspects.map(key => (
                        <div>
                            <p>{ key.aspect }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Aspects;