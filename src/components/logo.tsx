import React from "react";
import logo from "../images/fate.png";
import Image from "next/image";

const Logo: React.FC = () => {

    return (
        <div className="logoContainer">
            <Image 
                priority
                loading="eager"
                className="fate"
                src={ logo }
                alt="Fate"
            />
            <p className="paragraph" style={{ marginTop: "25px" }}>Fate™ is a trademark of Evil Hat Productions, LLC. The Powered by Fate logo is © Evil Hat Productions, LLC and is used with permission.</p>
        </div>
    );
}

export default Logo;