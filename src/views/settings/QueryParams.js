import React, {useState, useEffect} from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function queryToParams(query){
    const arr = [];
    Object.entries(query).forEach(
        ([key, value]) => arr.push({key, value})
    );
    return arr;
}
function paramsToQuery(params){
    return params.reduce((queryObject, param) => (
        {...queryObject, [param.key]: param.value}
    ), {});
}

export default function QueryParams({query, setQuery}){
    const [params, setParams] = useState(query? queryToParams(query): []);

    useEffect(() => {
        setQuery(paramsToQuery(params));
    }, [params]);

    function addField(){
        setParams([...params, {key: "", value: ""}]);
    }
    function deleteField(key){
        setParams(params.filter((param) => param.key !== key));
    }
    function updateKey(key, newKey){
        const paramsCopy = [...params];
        const targetIndex = paramsCopy.findIndex((param) => param.key === key);
        paramsCopy[targetIndex].key = newKey;
        setParams(paramsCopy);
    }
    function updateValue(key, value){
        const paramsCopy = [...params];
        const targetIndex = paramsCopy.findIndex((param) => param.key === key);
        paramsCopy[targetIndex].value = value;
        setParams(paramsCopy);
    }

    const queryParamComponents = params.map((param, index) =>
        <div key={index} className="flex space-x-4">
            <Input placeholder="Key" value={param.key} onChange={(e) => updateKey(param.key, e.target.value)}/>
            <Input placeholder="Value" value={param.value} onChange={(e) => updateValue(param.key, e.target.value)}/>
            <Button type="button" colour="red" onClick={() => deleteField(param.key)}>Remove</Button>
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center">
                <h3>Query string</h3>
                <Button type="button" onClick={addField}>Add parameter</Button>
            </div>
            <div className="overflow-auto h-32 space-y-2">
                {queryParamComponents}
            </div>

        </>
    );
}