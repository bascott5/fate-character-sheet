import { useState, useContext } from "react"
import { Context } from "./context-provider"

interface PropTypes {
    key: string,
    contextProp: object[],
    element: object,
    newElement: object,
    children: JSX.Element[]
}

const AddModifyDelete: React.FC<PropTypes> = ({ key, contextProp, element, newElement, children }: PropTypes) => {
    const [context, dispatch] = useContext(Context);
    const [modify, isModify] = useState<boolean>(false);

    return (
        <div>
            <div>
            {modify ? (
                <div>
                    <svg>
                        <rect 
                            fill="red" 
                            height={15} 
                            width={15} 
                            onClick={() => dispatch({
                                type: "DELETE OBJECT",
                                key: key,
                                value: contextProp,
                                propertyKey: element
                            })} 
                        />
                    </svg>
                </div>
            ) : null}
            </div>
            { children }
            <div>
                <button 
                    className="button" 
                    style={{ float: "left", color: context.theme.color, outlineColor: context.theme.color }}
                    onClick={() => dispatch({
                        type: "ADD OBJECT",
                        key: key,
                        value: contextProp,
                        addedValue: newElement
                    })}>
                +Add</button>
                <button 
                    className="button"
                    style={{ color: context.theme.color, outlineColor: context.theme.color }}
                    onClick={() => isModify(!modify)}>
                Modify</button>
            </div>
        </div>
        
    )
}

export default AddModifyDelete;