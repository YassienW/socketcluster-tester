import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {startMirage} from "../mock/Mirage";

if (process.env.NODE_ENV === "development"){
    startMirage();
}

ReactDOM.render(<App/>, document.getElementById("app"));