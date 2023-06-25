import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";
import DragNDrop from "./drag-n-drop";

export interface NoteTypes {
    title: string,
    description: string
}

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<NoteTypes[]>([{ 
        title: "",
        description: ""
    }]);
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="characterSheetBox">
            <h1>NOTES</h1> <button onClick={() => isEdit(!edit)} />
            <div>
                {edit ? (
                    <div>
                        <h2>EDIT NOTES</h2>
                        {context.notes.map((note, noteIndex) => (
                           <div>
                                {modify ? (
                                    <div>
                                    <DragNDrop arr={ context.skills } initIndex={ noteIndex } isVisible={ modify }>
                                        <svg>
                                            <rect 
                                                fill="red" 
                                                height={15} 
                                                width={15} 
                                                onClick={() => dispatch({
                                                    type: "DELETE OBJECT",
                                                    key: "notes",
                                                    value: context.notes,
                                                    propertyKey: note
                                                })} 
                                            />
                                            </svg>
                                        </DragNDrop>
                                    </div>
                                )
                                :
                                    null
                                }
                                <p style={{ fontWeight: "bold" }}>TITLE</p>
                                <input type="text" value={ note.title } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "notes",
                                    value: context.notes,
                                    propertyKey: "title",
                                    propertyIndex: noteIndex,
                                    event: e.target.value
                                })}/>
                                <p style={{ fontWeight: "bold" }}>NOTE</p>
                                <input type="text" value={ note.description } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "notes",
                                    value: context.notes,
                                    propertyKey: "description",
                                    propertyIndex: noteIndex,
                                    event: e.target.value
                                })}/>
                           </div> 
                        ))}
                        <button 
                            className="characterSheetButton" 
                            onClick={() => dispatch({
                                type: "ADD OBJECT",
                                key: "notes",
                                value: context.notes,
                                addedValue: {
                                    title: "",
                                    description: ""
                                }
                            })}>
                            +Add
                        </button>
                        <button 
                            className="characterSheetButton"
                            onClick={() => isModify(!modify)}>
                            Modify
                        </button>
                    </div>
                )
                :
                null
                }
                {context.notes.map((note, noteIndex) => (
                    <div>
                        <p style={{ fontWeight: "bold" }}>{ note.title }</p>
                        <p>{ note.description }</p>  
                    </div>
                ))}
            </div>
        </div>
    )

    /*return (
        <div className="characterSheetBox">
            <h1>NOTES</h1>
            <div>
                <button className="characterSheetButton" onClick={() => setNotes([...notes, ""])}>+</button>
                <button className="characterSheetButton" onClick={() => isEdit(!edit)}>Edit</button>
                {edit ?
                    context.notes.map((note, noteIndex) => (
                        <div>
                            <button onClick={() => setNotes(notes.filter(note => note != key))}>-</button>
                            <input type="text" value={ note.description } onChange={(e) => dispatch({
                                type: "HANDLE INPUT",
                                key: "notes",
                                value: context.notes,
                                propertyKey: "label",
                                propertyIndex: noteIndex,
                                event: e.target.value
                            })}/>
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
    )*/
}

export default Notes;