import React from "react";
import { useState, useContext } from "react";
import { Context } from "./context-provider";
import Image from "next/image";
import blueedit from "../images/blueedit.svg";
import rededit from "../images/rededit.svg";
import greenedit from "../images/greenedit.svg";
import purpleedit from "../images/purpleedit.svg";

interface Props {
    title: string,
    children: JSX.Element[]
}

const Edit: React.FC<Props> = ({ title, children }: Props) => {
    let [context, dispatch] = useContext(Context);
    const [edit, isEdit] = useState(false);

    return (
        <div>
            <Image
                priority
                loading="eager"
                src={
                    context.theme.theme == "Blue" ? blueedit :
                    context.theme.theme == "Red" ? rededit :
                    context.theme.theme == "Green" ? greenedit :
                    context.theme.theme == "Purple" ? purpleedit :
                    null
                }
                alt="Edit!"
                width={20}
                height={20}
                onClick={() => isEdit(!edit)}
            />
            <h1>{ title }</h1>
            {edit ? (
                <div className="innerSheetContent" style={{ color: context.theme.color, backgroundColor: context.theme.color }}>
                    <h2 style={{ color: "white" }}>EDIT { title }</h2>
                    { children }
                </div>
            ) : null}
        </div>
    )
}

export default Edit;