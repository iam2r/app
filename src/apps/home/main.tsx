import Vue from "vue";
import App from "./App";
import state from "./state";
import VuePlugin from "./VuePlugin";
import { loadJson, loadFont } from "@/common/Utils";
import { emitter } from "app.root/context";
Vue.use(VuePlugin);

const loading = async () => {
  const appData = (await loadJson("../apps.json?" + +new Date())) as any;
  state.appList = appData.apps.filter(it => it !== "home");
  state.resources = appData.resources.home;
  await loadFont(require("fontfaceobserver"), [
    "Source Sans Pro",
    "Dosis"
  ]).catch(error => {
    console.log("font preload error");
    emitter.emit("loaded");
  });

  emitter.emit("loaded");
};

emitter.once("loaded", () => {
  state.app = new Vue({
    render: h => h(App)
  }).$mount("#app");
});

loading();
