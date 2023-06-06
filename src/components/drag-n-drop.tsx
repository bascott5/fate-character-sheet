import { useEffect, useRef, useState } from "react";

interface Props {
    arr: Array<any>,
    key: any,
    initIndex: number
}
//if the user is holding down the mouse button at the top most part of the object container:
    //the object container's position is aligned with the mouse cursor
    //if the mouse cursor is above or below the position of another array element:
        //change the margin of the below element so it is further down, making room for the object container being held by the cursor
        //if the user takes their finger off the mouse button and the object container is above another element:
            //replace the index with the element
            //realign the object container's position so that is relative to the array again

const DragNDrop: React.FC<Props> = ({ arr, key, initIndex }: Props) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);

    const mouseDownHandler = (e: any) => setCursorPosition({ x: e.screenX, y: e.screenY });
    
    const box = useRef(null);
    useEffect(() => {
        window.addEventListener("mousedown", mouseDownHandler)
        return (() => (
            window.addEventListener("mouseup", mouseDownHandler)
        ))
    }, []);

    /*const box = useRef(null)
    useEffect((e) => {
        onclick()
        if (box.current.e.target.position) {
            arr.splice(initIndex, 1);
            arr.splice(b, 0, key);
        }
    }, [arr]);*/

    return (
        <div>
            <svg>
                <rect height={ 5 } width={ 5 } fill="black" style={ mouseDown ? { position: "absolute", ...cursorPosition } : { position: "absolute" }} onMouseOver={mouseDownHandler} onMouseDown={() => setMouseDown(!mouseDown)} />
            </svg>
        </div>
    )
}

export default DragNDrop;