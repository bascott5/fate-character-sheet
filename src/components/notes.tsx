import { useState, useContext } from "react";
import { Context } from "./context-provider";

const Notes: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [notes, setNotes] = useState<string[]>([]);

    return (
        <div>
            <h1>NOTES</h1>
            <div>
                <button onClick={() => setNotes([...notes, ""])}>+</button>
                <button onClick={() => isEdit(edit => edit = !edit)}>Edit</button>
                {notes.map(key => (
                    edit ?
                        <input type="text" value={key} onChange={(e) => setNotes(notes => {
                            notes[notes.indexOf(key)] = e.target.value;
                            return [...notes];
                        })} />
                    :
                        <p>{ key }</p>                
                ))}
            </div>
        </div>
    )
}

export default Notes;