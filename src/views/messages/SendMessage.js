import React, {useContext, useState} from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import {ClientsContext} from "../Contexts";

export default function SendMessage(){
    const clients = useContext(ClientsContext);
    const [message, setMessage] = useState("");
    const [payload, setPayload] = useState("");

    async function sendMessage(){
        clients[0].transmit(message, payload);
        setMessage("");
        setPayload("");
    }

    return (
        <div className="flex items-center space-x-2">
            <Input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
            <Input placeholder="Payload" value={payload} onChange={(e) => setPayload(e.target.value)}/>
            <Button onClick={sendMessage}>Send message</Button>
        </div>
    );
}