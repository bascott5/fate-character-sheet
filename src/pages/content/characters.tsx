import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { Context } from "@/components/context-provider";

const Characters: React.FC = () => {
    const [context, dispatch] = useContext(Context);
    const [modify, isModify] = useState<boolean>(false);
    const [rendered, isRendered] = useState<boolean>(false);

    useEffect(() => {
        window !== undefined ? isRendered(true) : isRendered(false);
    }, [])

    return (
        <div>
            {rendered ? (
                <div>
                    <button onClick={() => isModify(!modify)}>Modify+</button>
                    {Object.keys(localStorage).map(name => (
                        name !== "ally-supports-cache" ? (
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
                        ) : null
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Characters;