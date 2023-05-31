import { useState } from "react";

const Aspects: React.FC = () => {
    const [aspects, setAspects] = useState([{
        name: "",
        flagged: false,
        rollable: false,
        value: 0
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    //context["aspects"] = [...aspects];

    return (
        <div className="characterSheetBox">
            <h1>ASPECTS</h1>
            <button onClick={() => setAspects([...aspects, { name: "", flagged: false, rollable: false, value: 0 }])}>+</button>
            <button onClick={() => isEdit(!edit)}>Edit</button>
            <div>
                {edit ?
                    aspects.map(key => (
                        <div>
                            {aspects[aspects.indexOf(key)].rollable ?
                                aspects.map(key => (
                                    <div>
                                        <button onClick={() => { Math.floor(Math.random() * 6) + key.value }}>{ key.name }</button>
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