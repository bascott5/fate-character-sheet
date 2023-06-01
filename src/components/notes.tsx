import { useState, useEffect, useContext } from "react";
import { Context } from "@/components/context-provider";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<string[]>([""]);
    const [edit, isEdit] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);
    
    useEffect(() => {
        dispatch({ type: "Save", payload: notes });
    }, [notes]);

    return (
        <div className="characterSheetBox">
            <h1>NOTES</h1>
            <div>
                <button className="characterSheetButton" onClick={() => setNotes([...notes, ""])}>+</button>
                <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
                {edit ?
                    notes.map((key, index) => (
                        <div>
                            <button onClick={() => setNotes(notes.filter(note => note != key))}>-</button>
                            <input type="text" value={ key } onChange={(e) => setNotes(notes => {
                                let notesCopy = [...notes];
                                notesCopy[index] = e.target.value;
                                return [...notesCopy];
                            })} />
                        </div>
                    ))
                    :
                    notes.map(key => (
                        <div>
                            <p>{ key }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notes;