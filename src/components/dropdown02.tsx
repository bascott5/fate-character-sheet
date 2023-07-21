import { useState, useRef, useEffect } from "react";
import { ThemeTypes } from "./option-container";

interface PropTypes {
    title: string,
    arr: ThemeTypes[],
    func: (element: ThemeTypes) => void
}

const DropdownTwo: React.FC<PropTypes> = ({ title, arr, func }: PropTypes ) => {
    const [open, isOpen] = useState(false);
    const container = useRef<any>(null);

    useEffect(() => {
        const outsideClickHandler = (e: any) => {
            if (container.current && !container.current.contains(e.target)) {
                isOpen(false);
            }
        }
        
        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler)
        }
    }, [container]);

    const elementSelectionHandler = (element: ThemeTypes) => {
        func(element);
        isOpen(false);
    }

    return (
        <div className="dropdown" ref={ container }>
            <button className="dropdownContainer" onClick={() => isOpen(!open)}>{ title }</button>
            {arr.map(element => (
                <button className="dropdownContainer" style={{ display: open ? "block" : "none" }} onClick={() => elementSelectionHandler(element)}>{ element.theme }</button>
            ))}
        </div>
    )
}

export default DropdownTwo;