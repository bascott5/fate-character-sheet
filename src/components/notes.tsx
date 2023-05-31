import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<string[]>([""]);
    const [edit, isEdit] = useState<boolean>(false);

    return (
        <div className="characterSheetBox">
            <h1>NOTES</h1>
            <div>
                <button onClick={() => setNotes([...notes, ""])}>+</button>
                <button onClick={() => isEdit(!edit)}>Edit</button>
                {edit ?
                    notes.map(key => (
                        <div>
                            <button onClick={() => setNotes(notes.filter(note => note != key))}>-</button>
                            <input type="text" value={ key } onChange={(e) => setNotes(notes => {
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