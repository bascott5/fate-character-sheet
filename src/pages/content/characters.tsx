import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "@/components/context-provider";

interface NameTypes {
    key: string,
    value: object
}

const Characters: React.FC = () => {
    const [context, dispatch] = useContext(Context);
    const [names, setNames] = useState<NameTypes[]>([])
    const [modify, isModify] = useState<boolean>(false);
    for (let i = 0; i < localStorage.length; i++) {
        setNames([...names, localStorage[i]]);
    }

    return (
        <div>
            <button onClick={() => isModify(!modify)}>Modify+</button>
            {names.map((name, nameIndex) => (
                <div>
                    <Link href={"/content/character-sheet"} onClick={() => dispatch({
                        type: "LOAD JSON",
                        name: name.key
                    })}>{ name.key }</Link>
                    {modify ? (
                        <svg viewBox="0 0 1500 20">
                            <rect fill="red" onClick={() => {
                                localStorage.removeItem(name.key);
                                setNames(names => names.filter(nameCopy => nameCopy != name));
                            }}/>
                        </svg>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default Characters;