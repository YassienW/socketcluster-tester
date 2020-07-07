import React from "react";

export default function Logs({logs = []}){
    const components = logs.map((item, index) => {
        const textColour = item.error? "text-red-600": "text-gray-600";
        return (
            <p key={index} className={`${textColour} text-sm`}>
                {item.error || item.message}
            </p>
        );
    });

    return (
        <div className="h-64 border rounded px-2 py-1 overflow-auto">
            {components}
        </div>
    );
}