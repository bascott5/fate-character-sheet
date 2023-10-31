import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { Context, ObjectTypes } from "./context-provider";

interface Props {
    "arr": ObjectTypes[]
    "arrKey": string,
    "element": ObjectTypes,
    "initIndex": number,
    "isVisible": boolean,
    "children": JSX.Element | JSX.Element[]
}

const DragNDrop: React.FC<Props> = ({ arr, arrKey, element, initIndex, isVisible, children }: Props) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div className="lesserSheetContent">
            <button onClick={() => dispatch({
                type: "CHANGE INDEX",
                key: arrKey,
                value: arr,
                propertyIndex: initIndex,
                indexB: initIndex - 1
            })}>^</button>
            { children }
            <button onClick={() => dispatch({
                type: "CHANGE INDEX",
                key: arrKey,
                value: arr,
                propertyIndex: initIndex,
                indexB: initIndex + 1
            })}>v</button>
        </div>
    );

    /*const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    let [context, dispatch] = useContext(Context);
    const box = useRef<HTMLDivElement | null>(null);

    const mouseMoveHandler = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX - 51, y: e.clientY - 80 });
    }

    const handleClickOutside = (e: any) => {
        if (!box.current?.contains(e.target)) {
            console.log("click")
        } else {
            setMouseDown(false)
        }
    }

    useEffect(() => {
        handleClickOutside
        window.addEventListener("mousemove", mouseMoveHandler);
        return(() => {
            window.removeEventListener("mousemove", mouseMoveHandler);
        })
    }, []);

    useEffect(() => {
        dispatch({ 
            type: "CHANGE HEIGHT",
            key: arrKey,
            value: arr,
            propertyIndex: initIndex,
            boxHeight: box.current?.offsetTop
        })
    }, [mouseDown])

    useEffect(() => {
        if (arr.length > 1) {
            if (element != arr[arr.length - 1] && element.height < arr[initIndex + 1].height) {
                dispatch({ 
                    type: "CHANGE INDEX",
                    key: arrKey,
                    value: arr,
                    propertyIndex: initIndex,
                    indexB: initIndex + 1 //element.height > arr[index.plusOne].height ? 1 : 0
                })
            } else if (element != arr[0] && element.height > arr[initIndex - 1].height) {
                dispatch({ 
                    type: "CHANGE INDEX",
                    key: arrKey,
                    value: arr,
                    propertyIndex: initIndex,
                    indexB: initIndex - 1 //element.height > arr[index.minusOne].height ? 1 : 0
                })
            } else {
                [...arr]
            }
        }
    }, [arr])

    return (
        <div 
            ref={box}
            onMouseUp={() => setMouseDown(false)}
            style={ mouseDown ? { zIndex: 1, position: "absolute", top: cursorPosition.y } : { position: "static" } /*&& (mouseDown && element.height < context[arrKey][initIndex + 1].height ? { position: "absolute", top: cursorPosition.y - 50 } : { position: "static" })}
        >
            <svg style={ isVisible ? { display: "block" } : { display: "none" } }>
                <rect 
                    height={ 15 } 
                    width={ 15 } 
                    fill="black" 
                    onMouseDown={() => setMouseDown(true)}
                />
            </svg>
            { children }
        </div>
    )*/
}

export default DragNDrop;