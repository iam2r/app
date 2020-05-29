import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import Bump from "app.root/libs/bump.js";
import { config } from "app.root/context";

Vue.use(Vuex);

const storeOptions: StoreOptions<{
  bump: Bump;
  state: string;
  scale: number;
  width: number;
  height: number;
  contain: any;
}> = {
  state: {
    bump: new Bump(PIXI),
    state: "",
    scale: 1,
    width: window.innerWidth,
    height: window.innerHeight,
    contain: {
      x: 30,
      y: 30,
      width: config.size.width - 30,
      height: config.size.height - 30,
    },
  },
};

export default new Store(storeOptions);
