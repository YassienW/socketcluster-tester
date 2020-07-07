import React from "react";

export default React.forwardRef(function Input(props, ref){
    return (
        <input {...props} ref={ref}
               className="appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"/>
    );
});