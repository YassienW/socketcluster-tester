import React from "react";
import Input from "../common/Input";
import QueryParams from "./QueryParams";

export default function ClientSettings({settings, setSettings}){
    return (
        <form className="space-y-3">
            <p className="text-lg">Client settings</p>
            <div className="flex space-x-4">
                <Input value={settings.hostname} placeholder="Hostname"
                       onChange={(e) => setSettings({hostname: e.target.value})}/>
                <Input value={settings.port} placeholder="Port" onChange={(e) => setSettings({port: e.target.value})}/>
                <Input value={settings.path} placeholder="Path" onChange={(e) => setSettings({path: e.target.value})}/>
            </div>
            <QueryParams query={settings.query} setQuery={(newQuery) => setSettings({query: newQuery})}/>
        </form>
    );
}