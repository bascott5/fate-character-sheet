import { useEffect, useRef, useState, useContext } from "react";
import { Context, ObjectTypes } from "./context-provider";

interface Props {
    "arr": ObjectTypes[]
    "arrKey": string,
    "element": ObjectTypes,
    "initIndex": number,
    "isVisible": boolean,
    "children": JSX.Element | null
}

//if the user is holding down the mouse button at the top most part of the object container:
    //the object container's position is aligned with the mouse cursor
    //if the mouse cursor is above or below the position of another array element:
        //change the margin of the below element so it is further down, making room for the object container being held by the cursor
        //if the user takes their finger off the mouse button and the object container is above another element:
            //replace the index with the element
            //realign the object container's position so that is relative to the array again

const DragNDrop: React.FC<Props> = ({ arr, arrKey, element, initIndex, isVisible, children }: Props) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    let [context, dispatch] = useContext(Context);
    const box = useRef<HTMLDivElement | null>(null);

    const mouseMoveHandler = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX - 51, y: e.clientY - 100 });
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
        //if (arr.length > 1) because there aren't multiple elements in the array yet so the array doesn't know what I'm refering to when I try to grab one above when there's only one
        /*if (element.height > arr[(initIndex + 1)].height && element.height < arr[initIndex - 1].height) {
            dispatch({ 
                type: "CHANGE INDEX",
                key: arrKey,
                value: arr,
                propertyIndex: initIndex,
                propertyValue: element,
                indexB: initIndex - 1
            })
        }*/
    }, [mouseDown])

    return (
        <div 
            ref={box}
            onMouseUp={() => setMouseDown(false)}
            style={ mouseDown ? { zIndex: 1, position: "absolute", top: cursorPosition.y } : { position: "static" } /*&& (mouseDown && element.height < context[arrKey][initIndex + 1].height ? { position: "absolute", top: cursorPosition.y - 50 } : { position: "static" })*/}
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
    )
}

export default DragNDrop;