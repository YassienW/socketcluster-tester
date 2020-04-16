import {Server, Model, Factory, belongsTo} from "miragejs";

import route from "./route";

export function startMirage(environment = "development"){
    return new Server({
        environment,
        models: {

        },
        factories: {

        },
        seeds(server){

        },
        routes(){
            this.namespace = "/";

            route.call(this);
        },
    });
}

