import React from "react";
import { useContext } from "react";
import { Context, ObjectTypes } from "./context-provider";
import Image from "next/image";
import bluetrash from "../images/bluetrash.svg";
import redtrash from "../images/redtrash.svg";
import greentrash from "../images/greentrash.svg";
import purpletrash from "../images/purpletrash.svg";
import blueuparrow from "../images/blueuparrow.svg";
import reduparrow from "../images/reduparrow.svg";
import greenuparrow from "../images/greenuparrow.svg";
import purpleuparrow from "../images/purpleuparrow.svg";
import bluedownarrow from "../images/bluedownarrow.svg";
import reddownarrow from "../images/reddownarrow.svg";
import greendownarrow from "../images/greendownarrow.svg";
import purpledownarrow from "../images/purpledownarrow.svg";

interface Props {
    "arr": ObjectTypes[],
    "element": ObjectTypes
    "arrKey": string,
    "initIndex": number,
    "isVisible": boolean,
    "children": JSX.Element | JSX.Element[]
}

const ModifyMenu: React.FC<Props> = ({ arr, element, arrKey, initIndex, isVisible, children }: Props) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div className="lesserSheetContent">
            {isVisible ? (
                <div>
                    <Image 
                        priority
                        loading="eager"
                        className="trash"
                        src={
                            context.theme.theme == "Blue" ? bluetrash :
                            context.theme.theme == "Red" ? redtrash :
                            context.theme.theme == "Green" ? greentrash :
                            context.theme.theme == "Purple" ? purpletrash :
                            null
                        }
                        alt="Delete"
                        width={30}
                        height={30}
                        onClick={() => dispatch({
                            type: "DELETE OBJECT",
                            key: arrKey,
                            value: arr,
                            propertyKey: element
                        })}
                    />
                    <Image
                        priority
                        loading="eager"
                        className="indexChanger"
                        src={
                            context.theme.theme == "Blue" ? blueuparrow :
                            context.theme.theme == "Red" ? reduparrow :
                            context.theme.theme == "Green" ? greenuparrow :
                            context.theme.theme == "Purple" ? purpleuparrow :
                            null
                        }
                        alt="Up!"
                        width={30}
                        height={30}
                        style={{ float: "right" }}
                        onClick={() => dispatch({
                            type: "CHANGE INDEX",
                            key: arrKey,
                            value: arr,
                            propertyIndex: initIndex,
                            indexB: initIndex - 1
                        })}
                    />
                </div>
            ) : null}
            { children }
            {isVisible ? (
                <Image
                    priority
                    loading="eager"
                    className="indexChanger"
                    src={
                        context.theme.theme == "Blue" ? bluedownarrow :
                        context.theme.theme == "Red" ? reddownarrow :
                        context.theme.theme == "Green" ? greendownarrow :
                        context.theme.theme == "Purple" ? purpledownarrow :
                        null
                    }
                    alt="Down!"
                    width={30}
                    height={30}
                    style={{ float: "right", margin: "-30px 0px 0px 0px" }}
                    onClick={() => dispatch({
                        type: "CHANGE INDEX",
                        key: arrKey,
                        value: arr,
                        propertyIndex: initIndex,
                        indexB: initIndex + 1
                    })}
                />
            ) : null}
        </div>
    );
}

export default ModifyMenu;