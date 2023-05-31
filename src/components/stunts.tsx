import { useState } from "react";

const Stunts: React.FC = () => {
    const [stunts, setStunts] = useState([{
        name: "",
        description: ""
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    //context["stunts"] = [...stunts];

    return (
        <div className="characterSheetBox">
            <h1>STUNTS</h1>
            <button onClick={() => setStunts([...stunts, { name: "", description: "" }])}>+</button>
            <button onClick={() => isEdit(!edit)}>Edit</button>
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