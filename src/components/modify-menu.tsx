import { useContext } from "react";
import { Context, ObjectTypes } from "./context-provider";

interface Props {
    "arr": ObjectTypes[],
    "element": ObjectTypes
    "arrKey": string,
    "initIndex": number,
    "isVisible": boolean,
    "children": JSX.Element | JSX.Element[]
}

const ModifyMenu: React.FC<Props> = ({ arr, element, arrKey, initIndex, isVisible, children }: Props) => {
    const [context, dispatch] = useContext(Context);

    return (
        <div className="lesserSheetContent">
            {isVisible ? (
                <div>
                    <svg viewBox="0 0 1500 35">
                        <rect 
                            fill="red"
                            x={ 1480 }
                            height={ 20 } 
                            width={ 20 } 
                            onClick={() => dispatch({
                                type: "DELETE OBJECT",
                                key: arrKey,
                                value: arr,
                                propertyKey: element
                            })} 
                        />
                    </svg>
                    <button className="button" style={{ float: "right", backgroundColor: context.theme.color }} onClick={() => dispatch({
                        type: "CHANGE INDEX",
                        key: arrKey,
                        value: arr,
                        propertyIndex: initIndex,
                        indexB: initIndex - 1
                    })}>^</button>
                </div>
            ) : null}
            { children }
            {isVisible ? (
                <button className="button" style={{ float: "right", backgroundColor: context.theme.color }} onClick={() => dispatch({
                    type: "CHANGE INDEX",
                    key: arrKey,
                    value: arr,
                    propertyIndex: initIndex,
                    indexB: initIndex + 1
                })}>v</button>
            ) : null}
        </div>
    );
}

export default ModifyMenu;