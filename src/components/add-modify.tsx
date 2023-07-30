import { useState, useContext } from "react"
import { Context } from "./context-provider"

interface PropTypes {
    modify: () => void,
    arrKey: string,
    arr: object[],
    newElement: object
}

const AddModify: React.FC<PropTypes> = ({ modify, arr, arrKey, newElement }: PropTypes) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div>
            <button 
                className="button" 
                style={{ float: "left", color: context.theme.color, outlineColor: context.theme.color }}
                onClick={() => dispatch({
                    type: "ADD OBJECT",
                    key: arrKey,
                    value: arr,
                    addedValue: newElement
                })}>
            +Add</button>
            <button 
                className="button"
                style={{ color: context.theme.color, outlineColor: context.theme.color }}
                onClick={ modify }>
            Modify</button>
        </div>
    )
}

export default AddModify;