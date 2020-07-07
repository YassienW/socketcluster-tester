import React, {useContext, useState} from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import {ClientsContext} from "../Contexts";
import Logs from "../Logs";

export default function RPCs(){
    const clients = useContext(ClientsContext);
    const [call, setCall] = useState("");
    const [data, setData] = useState("");
    const [logs, setLogs] = useState([]);

    async function sendRPC(){
        try{
            await clients[0].invoke(call, data);
            setLogs([...logs, {message: `RPC ${call} sent. Data ${data}`}]);
        }catch(error){
            setLogs([...logs, {error: `${error}`}]);
        }
    }

    return (
        <>
            <div className="flex items-center whitespace-no-wrap space-x-4">
                <Input placeholder="RPC" value={call} onChange={(e) => setCall(e.target.value)}/>
                <Input placeholder="RPC Data" value={data} onChange={(e) => setData(e.target.value)}/>
                <Button onClick={sendRPC}>Send RPC</Button>
            </div>
            <Logs logs={logs}/>
        </>

    );
}