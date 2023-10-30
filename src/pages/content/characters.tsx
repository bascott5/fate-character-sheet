import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { initState } from "@/components/context-provider";
import { Context } from "../../components/context-provider";
import bluetrash from "../../images/bluetrash.svg";
import Background from "../../components/background";

const Characters: React.FC = () => {
    let [context, dispatch] = useContext(Context);
    const [modify, isModify] = useState<boolean>(false);
    const [rendered, isRendered] = useState<boolean>(false);

    useEffect(() => {
        window !== undefined ? isRendered(true) : isRendered(false);
    }, [])

    return (
        <div>
            <Background />
            {rendered ? (
                <div>
                    <div style={{ margin: "2px 145px 0px 0px", float: "right" }}>
                        <Link href={{ pathname: "/content/character-sheet" }}><button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }}>New Character</button></Link>
                        <button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }} onClick={() => isModify(!modify)}>Modify{modify ? "-" : "+"}</button>
                    </div>
                    <div style={{ position: "absolute", display: "block" }}>
                        {Object.keys(localStorage).map(name => (
                            JSON.stringify(Object.keys(JSON.parse(localStorage.getItem(name) || "{}"))) == JSON.stringify(Object.keys(initState)) ? (
                                <div>
                                    <Link style={{ textDecoration: "none" }} href={{
                                        pathname: "/content/character-sheet",
                                        query: { name: name }
                                    }}><h1 style={{ color: context.theme.color, float: "left", margin: "150px 0px 50px 250px", fontSize: "50px", fontFamily: "sans-serif" }}>{ name }</h1></Link>
                                    {modify ? (
                                        <Image 
                                            priority
                                            loading="eager"
                                            className="trash"
                                            style={{ float: "right", margin: "163px -1290px 0px 1200px" }}
                                            src={
                                                context.theme.theme == "Blue" ? bluetrash : null
                                            }
                                            alt="Delete"
                                            width={35}
                                            height={35}
                                            onClick={() => {
                                                localStorage.removeItem(name);
                                                isModify(false);
                                            }}
                                        />
                                    ) : null}
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Characters;