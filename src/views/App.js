import React, {useState, useEffect, useReducer} from "react";
import {ClientsContext} from "./Contexts";
import socketClusterClient from "socketcluster-client";
import RPCs from "./rpcs/RPCs";
import ClientSettings from "./settings/ClientSettings";
import Button from "./common/Button";
import Logs from "./Logs";
import Messages from "./messages/Messages";

const loadedSettings = JSON.parse(localStorage.getItem("scClientSettings")) || {secure: false};

export default function App(){
    const [clients, setClients] = useState([]);
    const [settings, setSettings] = useReducer((prevState, newState) => ({...prevState, ...newState}), loadedSettings);
    const [logs, appendLog] = useReducer((prevLogs, newLog) => [...prevLogs, newLog], []);
    const [isConnected, setIsConnected] = useState(false);

/*    Object.keys(settings).forEach((setting) => {
        if(!settings[setting]){
            delete settings[setting];
        }
    });*/

    useEffect(() => {
        localStorage.setItem("scClientSettings", JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        addClient();
    }, []);

    function addClient(){
        const socket = socketClusterClient.create(settings);

        (async () => {
            for await (const {error} of socket.listener("error")){
                appendLog({error: `${error}`});
            }
        })();
        (async () => {
            for await (const event of socket.listener("connect")){
                setIsConnected(true);
                appendLog({message: "Connected"});
            }
        })();
        (async () => {
            for await (const event of socket.listener("close")){
                setIsConnected(false);
                appendLog({message: "Disconnected"});
            }
        })();
        setClients([...clients, socket]);
    }

    return (
        <ClientsContext.Provider value={clients}>
            <div className="grid grid-cols-6 gap-6 m-4">
                <div className="col-span-3 space-y-3">
                    <div className="flex justify-end items-center">
                        <span className={`mr-10 ${isConnected? "text-green-500": "text-red-500"}`}>
                            {isConnected? "Connected" : "Disconnected"}
                        </span>
                        {/*<Button onClick={addClient}>Add Client</Button>*/}
                    </div>
                    <ClientSettings settings={settings} setSettings={setSettings}/>
                </div>
                <div className="col-span-3 space-y-3">
                    <p className="text-lg">Connection logs</p>
                    <Logs logs={logs}/>
                </div>
                <div className="col-span-3 space-y-3">
                    <p className="text-lg">Messages</p>
                    <Messages/>
                </div>
                <div className="col-span-3 space-y-3">
                    <p className="text-lg">RPCs</p>
                    <RPCs/>
                </div>
            </div>
        </ClientsContext.Provider>
    );
}