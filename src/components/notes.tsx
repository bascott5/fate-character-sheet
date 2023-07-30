import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";
import DragNDrop from "./drag-n-drop";
import Delete from "./delete";
import AddModify from "./add-modify";

export interface NoteTypes {
    title: string,
    description: string,
    height: number
}

const Notes: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div>
                <svg style={{position: "absolute"}} viewBox="-120 -7 1500 35">
                    <circle fill={context.theme.color} cx="10" cy="10" r="10" onClick={() => isEdit(!edit)} />
                </svg>
                <h1>NOTES</h1>
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT NOTES</h2>
                    {context.notes.map((note, noteIndex) => (
                        <DragNDrop arr={ context.notes } arrKey={ "notes" } element={ note } initIndex={ noteIndex } isVisible={ modify }>
                            <div>
                                {modify ? (
                                    <Delete arr={ context.notes } arrKey={ "notes" } element={ note } />
                                ) : null}
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
                        </DragNDrop>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.notes } arrKey={ "notes" } newElement={{
                        title: "",
                        description: ""
                    }}/>
                </div>
            ) : null}
            {context.notes.map((note, noteIndex) => (
                <div>
                    <p style={{ fontWeight: "bold" }}>{ note.title }</p>
                    <p>{ note.description }</p>  
                </div>
            ))}
        </div>
    )
}

export default Notes;