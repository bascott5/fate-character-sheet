import React from "react";
import { useState, useContext } from "react";
import { Context } from "../components/context-provider";
import AddModify from "./add-modify";
import ModifyMenu from "./modify-menu";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

export interface NoteTypes {
    title: string,
    description: string
}

const Notes: React.FC = () => {
    const [edit, isEdit] = useState<boolean>(false);
    const [modify, isModify] = useState<boolean>(false);
    let [context, dispatch] = useContext(Context);

    return (
        <div className="sheetContent" style={{ color: context.theme.color, outlineColor: context.theme.color }}>
            <div style={{ margin: "0px 0px 50px 0px" }}>
                <h1 className="title" style={{ margin: "0px 0px 0px 0px" }}>NOTES</h1>
                <Image
                    priority
                    loading="eager"
                    className="edit"
                    src={
                        context.theme.theme == "Blue" ? blueedit :
                        context.theme.theme == "Red" ? rededit :
                        context.theme.theme == "Green" ? greenedit :
                        context.theme.theme == "Purple" ? purpleedit :
                        null
                    }
                    alt="Edit!"
                    width={25}
                    height={25}
                    onClick={() => isEdit(!edit)}
                />
            </div>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 className="title" style={{ color: "white" }}>EDIT NOTES</h2>
                    {context.notes.map((note, noteIndex) => (
                        <ModifyMenu key={ noteIndex } arr={ context.notes } element={ note } arrKey={ "notes" } initIndex={ noteIndex } isVisible={ modify }>
                            <div>
                                <p className="headerText">TITLE</p>
                                <input className="input" type="text" value={ note.title } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "notes",
                                    value: context.notes,
                                    propertyKey: "title",
                                    propertyIndex: noteIndex,
                                    event: e.target.value
                                })}/>
                                <p className="headerText">NOTE</p>
                                <input className="input" type="text" value={ note.description } onChange={(e) => dispatch({
                                    type: "HANDLE INPUT",
                                    key: "notes",
                                    value: context.notes,
                                    propertyKey: "description",
                                    propertyIndex: noteIndex,
                                    event: e.target.value
                                })}/>
                            </div>
                        </ModifyMenu>
                    ))}
                    <AddModify modify={ () => isModify(!modify) } arr={ context.notes } arrKey={ "notes" } newElement={{
                        title: "",
                        description: ""
                    }}/>
                </div>
            ) : null}
            {context.notes.map((note, noteIndex) => (
                <div key={ noteIndex } style={ Object.values(note).toString() == "," ? { display: "none" } : edit ? { margin: "25px 0px 0px 0px" } : { margin: "-15px 0px 35px 0px" } }>
                    <p className="headerText" style={{ margin: "0px 0px 10px 0px" }}>{ note.title }</p>
                    <p className="paragraph">{ note.description }</p>  
                </div>
            ))}
        </div>
    )
}

export default Notes;