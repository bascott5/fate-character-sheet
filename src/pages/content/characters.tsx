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

    return ( //pass data of name chosen to character-sheet that triggers a useEffect that causes the JSON to load in
        <div>
            {visibility ? (<div></div>) : (<div>{ children }</div>)}
            <button onClick={() => isModify(!modify)}>Modify+</button>
            {Object.keys(localStorage).map((name) => (
                <div>
                    <Link href={{
                        pathname: "/content/character-sheet",
                        query: { name: name }
                    }}>{ name }</Link>
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