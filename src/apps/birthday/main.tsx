import Vue from "vue";
import App from "./App";
import state from "./state";
import VuePlugin from "./VuePlugin";
import { loadJson, loadFont } from "@/common/Utils";
import { emitter } from "app.root/context";
Vue.use(VuePlugin);

const loading = async () => {
  await loadFont(require("fontfaceobserver"), ["Source Sans Pro", "Dosis"])
    .catch((error) => {
      console.info("font preload timeout!");
    })
    .finally(() => {
      emitter.emit("loaded");
    });
};

emitter.once("loaded", () => {
  state.app = new Vue({
    render: (h) => h(App),
  }).$mount("#app");
});

loading();
