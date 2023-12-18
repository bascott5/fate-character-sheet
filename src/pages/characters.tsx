import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { initState } from "./../components/context-provider";
import { Context } from "./../components/context-provider";
import bluetrash from "./../images/bluetrash.svg";
import Background from "./../components/background";

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
                <div style={{}}>
                    <div style={{ right: 125, top: 25, position: "absolute" }}>
                        <Link href={{ pathname: "/character-sheet" }}><button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }}>New Character</button></Link>
                        <button className="button" style={{ color: context.theme.color, backgroundColor: "white", outlineColor: context.theme.color, outline: "solid" }} onClick={() => isModify(!modify)}>Modify{modify ? "-" : "+"}</button>
                    </div>
                    <div style={{  padding: "100px 50px 50px 0px" }}>
                        {Object.keys(localStorage).map((name, nameIndex) => (
                            JSON.stringify(Object.keys(JSON.parse(localStorage.getItem(name) || "{}"))) == JSON.stringify(Object.keys(initState)) ? (
                                <div key={ nameIndex } style={{ width: "85%"}}>
                                    {modify ? (
                                        <Image 
                                            priority
                                            loading="eager"
                                            className="trash"
                                            style={{ float: "right", marginTop: "15px", position: "relative" }}
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
                                    <Link style={{ textDecoration: "none", width: "25%" }} href={{
                                        pathname: "/character-sheet",
                                        query: { name: name }
                                    }}><h1 style={{ color: context.theme.color, margin: "50px 0px 0px 250px", fontSize: "50px", fontFamily: "sans-serif" }}>{ name }</h1></Link>
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