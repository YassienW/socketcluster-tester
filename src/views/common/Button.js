import React from "react";

const baseClassName = "text-white py-1 px-2 whitespace-no-wrap focus:shadow-outline focus:outline-none rounded";

export default function Button({children, colour="blue", ...rest}){
    const className = `${baseClassName} bg-${colour}-600 hover:bg-${colour}-700`;
    return (
        <button className={className} {...rest}>
            {children}
        </button>
    );
}