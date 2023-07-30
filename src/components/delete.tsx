import { useContext } from "react";
import { Context } from "./context-provider";

interface PropTypes {
    arr: object[],
    arrKey: string,
    element: object
}

const Delete: React.FC<PropTypes> = ({ arr, arrKey, element }: PropTypes) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div>
            <svg>
                <rect 
                    fill="red" 
                    height={15} 
                    width={15} 
                    onClick={() => dispatch({
                        type: "DELETE OBJECT",
                        key: arrKey,
                        value: arr,
                        propertyKey: element
                    })} 
                />
            </svg>
        </div>
    )
}

export default Delete;