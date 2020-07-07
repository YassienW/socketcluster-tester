import React, {useContext, useState, useReducer} from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import {ClientsContext} from "../Contexts";
import Logs from "../Logs";
import SendMessage from "./SendMessage";

export default function Messages(){
    const clients = useContext(ClientsContext);
    const [eventName, setEventName] = useState("");
    const [handlers, setHandlers] = useState([]);
    const [logs, appendLog] = useReducer((prevLogs, newLog) => [...prevLogs, newLog], []);

    function addHandler(){
        (async () => {
            for await (const data of clients[0].receiver(eventName)) {
                appendLog({message: `Received event ${eventName}. Payload: ${data}`});
            }
        })();
        setHandlers([...handlers, eventName]);
        setEventName("");
    }
    function removeHandler(eventName){
        clients[0].closeReceiver(eventName);
        setHandlers(handlers.filter((handlerName) => handlerName !== eventName));
    }

    const handlerComponents = handlers.map((handlerName, index) => (
        <div key={index} className="border rounded p-1 flex justify-between">
            {handlerName}
            <a href="#" onClick={() => removeHandler(handlerName)}>X</a>
        </div>
    ));

    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1 space-y-3">
                <div className="flex items-center space-x-2">
                    <Input placeholder="Event name" value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                    <Button onClick={addHandler}>Add</Button>
                </div>
                <div className="space-y-1 h-64 overflow-auto">
                    {handlerComponents}
                </div>
            </div>
            <div className="col-span-2 space-y-3">
                <SendMessage/>
                <Logs logs={logs}/>
            </div>
        </div>
    );
}