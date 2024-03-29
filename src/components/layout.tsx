import React from "react";
import Navbar from "../components/navbar";

interface Props {
	children: JSX.Element
}

const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div>
            <Navbar />
            { children }
        </div>
    )
}

export default Layout;