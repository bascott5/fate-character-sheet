import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<string[]>([]);
    const [edit, isEdit] = useState<boolean>(false);

    return (
        <div>
            <h1>NOTES</h1>
            <div>
                <button onClick={() => setNotes([...notes, ""])}>+</button>
                <button onClick={() => isEdit(edit => edit = !edit)}>Edit</button>
                {edit ?
                    notes.map(key => (
                        <div>
                            <button onChange={() => setNotes(notes.filter(note => note))}>-</button>
                            <input type="text" value={key} onChange={(e) => setNotes(notes => {
                            notes[notes.indexOf(key)] = e.target.value;
                            return [...notes];
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