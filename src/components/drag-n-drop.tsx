import { useEffect, useRef, useState } from "react";
import { SkillsInterface } from "@/components/skills";

interface Props {
    arr: Array<SkillsInterface>,
    initIndex: number,
    children: JSX.Element[]
}

//if the user is holding down the mouse button at the top most part of the object container:
    //the object container's position is aligned with the mouse cursor
    //if the mouse cursor is above or below the position of another array element:
        //change the margin of the below element so it is further down, making room for the object container being held by the cursor
        //if the user takes their finger off the mouse button and the object container is above another element:
            //replace the index with the element
            //realign the object container's position so that is relative to the array again

const DragNDrop: React.FC<Props> = ({ arr, initIndex, children }: Props) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);

    const box = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        box.current = box.current.slice(0, arr.length);
    }, [arr]);

    const mouseDownHandler = (e: MouseEvent) => {
        setCursorPosition({ x: e.clientX - 51, y: e.clientY - 100 });
    }

    useEffect(() => {
        window.addEventListener("mousemove", mouseDownHandler);
        return(() => {
            window.removeEventListener("mousemove", mouseDownHandler);
        })
    }, []);

    useEffect(() => {
        /*if (mouseDown) {
            if (cursorPosition.y > box.current[initIndex + 1]!.offsetTop && cursorPosition.y < box.current[initIndex - 1]!.offsetTop) {
                let temp = arr[initIndex - 1];
                arr[initIndex - 1] = arr[initIndex];
                arr[initIndex] = temp;
            }
        }*/
    }, [mouseDown]);

    return (
        <div 
            ref={ex => box.current[initIndex] = ex}
            onMouseUp={() => setMouseDown(false)}
            style={ mouseDown ? { zIndex: 1, position: "absolute", left: 0, top: cursorPosition.y } : { position: "static" } }
        >
            <svg>
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