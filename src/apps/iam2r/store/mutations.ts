import {State} from "./interface";

export default {
    updateName(state:State,preload:any){
        state.name = preload;
    }
}