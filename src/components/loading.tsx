import React from "react";
import { useEffect, useState } from "react";

interface PropTypes {
    children: JSX.Element
}

const Loading: React.FC<PropTypes> = ({ children }: PropTypes) => {
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => isLoading(false), 5000)
    }, [])

    return (
        <div>
            {loading ? (
                <div>
                    <p>Loading!</p>
                </div>
            ) : (
                <div>
                    { children }
                </div>
            )}
        </div>
    );
}

export default Loading;