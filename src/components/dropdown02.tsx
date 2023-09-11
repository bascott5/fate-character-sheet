import { useState, useRef, useContext, useEffect } from "react";
import { Context } from "./context-provider";
import { ThemeTypes } from "./option-container";

interface PropTypes {
    title: string,
    arr: ThemeTypes[],
    func: (element: ThemeTypes) => void
}

const DropdownTwo: React.FC<PropTypes> = ({ title, arr, func }: PropTypes ) => {
    const [context, dispatch] = useContext(Context);
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
            <button className="dropdownContainer" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }} onClick={() => isOpen(!open)}>{ title }</button>
            <div style={{ position: "absolute" }}>
                {arr.map(element => (
                    <button className="dropdownElement" style={{ display: open ? "block" : "none", backgroundColor: context.theme.color }} onClick={() => elementSelectionHandler(element)}>{ element.theme }</button>
                ))}
            </div>
        </div>
    )
}

export default DropdownTwo;