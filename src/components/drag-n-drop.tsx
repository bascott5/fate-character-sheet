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

const DragNDrop: React.FC<any> = ({ arr, key, initIndex, box }: any) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);

    const mouseDownHandler = (e: any) => setCursorPosition({ x: e.screenX, y: e.screenY });
    useEffect(() => {
        if (mouseDown) {
            if (cursorPosition.y > box.current[initIndex + 1].offsetTop && cursorPosition.y < box.current[initIndex - 1].offsetTop) {
                arr.splice(initIndex, 1);
                const b = initIndex - 1;
                arr.splice(b, 0, key);
            }
        }

        /*window.addEventListener("mousedown", mouseDownHandler)
        return (() => (
            //window.addEventListener("mouseup", mouseDownHandler)
        ))*/
    }, [mouseDown]);

    return (
        <div>
            <svg>
                <rect ref={ box } height={ 15 } width={ 15 } fill="black" style={ mouseDown ? { position: "absolute", ...cursorPosition } : { position: "static" }} onMouseOver={mouseDownHandler} onMouseDown={() => setMouseDown(mouseDown => mouseDown = true)} onMouseUp={() => setMouseDown(mouseDown => mouseDown = false)} />
            </svg>
        </div>
    )
}

export default DragNDrop;