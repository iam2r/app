import Vue from "vue";
import * as PIXI from "pixi.js";
import Vuex, { Store, StoreOptions } from "vuex";
import Bump from "app.root/libs/bump.js"
Vue.use(Vuex);

let storeOptions: StoreOptions<{
    bump: Bump;
    state: string;
    scale: number;
    width: number;
    height: number;
}> = {
    state: {
        bump: new Bump(PIXI),
        state: "",
        scale: 1,
        width: window.innerWidth,
        height: window.innerHeight
    }
}

export default new Store(storeOptions);