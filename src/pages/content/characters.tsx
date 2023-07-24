import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";

interface NameTypes {
    key: string,
    value: object
}

interface PropTypes {
    children: JSX.Element[],
    visibility: boolean
}

const Characters: React.FC<PropTypes> = ({ children, visibility }: PropTypes) => {
    const [context, dispatch] = useContext(Context);
    const [modify, isModify] = useState<boolean>(false);

    return ( //incorporate component into character sheet component so it can share in the context provider and hide it when not in use
        <div>
            {visibility ? (<div></div>) : (<div>{ children }</div>)}
            <button onClick={() => isModify(!modify)}>Modify+</button>
            {Object.keys(localStorage).map((name) => (
                <div>
                    <Link href={"/content/character-sheet"} onClick={() => dispatch({
                        type: "LOAD JSON",
                        name: name
                    })}>{ name }</Link>
                    {modify ? (
                        <svg viewBox="0 0 1500 20">
                            <rect fill="red" height={10} width={10} onClick={() => localStorage.removeItem(name)} />
                        </svg>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Characters;