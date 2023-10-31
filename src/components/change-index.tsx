import React from "react";
import { useContext } from "react";
import { Context, ObjectTypes } from "./context-provider";

interface Props {
    "arr": ObjectTypes[]
    "arrKey": string,
    "initIndex": number,
    "isVisible": boolean,
    "children": JSX.Element | JSX.Element[]
}

const ChangeIndex: React.FC<Props> = ({ arr, arrKey, initIndex, isVisible, children }: Props) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div className="lesserSheetContent">
            {isVisible ? (
                <button onClick={() => dispatch({
                    type: "CHANGE INDEX",
                    key: arrKey,
                    value: arr,
                    propertyIndex: initIndex,
                    indexB: initIndex - 1
                })}>^</button>
            ) : null}
            { children }
            {isVisible ? (
                <button onClick={() => dispatch({
                    type: "CHANGE INDEX",
                    key: arrKey,
                    value: arr,
                    propertyIndex: initIndex,
                    indexB: initIndex + 1
                })}>v</button>
            ) : null}
        </div>
    );
}

export default ChangeIndex;