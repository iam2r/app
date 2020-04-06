import Vue from "vue";
import App from "./App";
import state from "./state";
import VuePlugin from "./VuePlugin";
import resource from "app.root/resources";
import { loadJson, loadFont, loadImage } from "@/common/Utils";
import { emitter } from "app.root/context";
Vue.use(VuePlugin);

const loading = async () => {
  const imageLoadArr = [];
  Object.entries(resource).map(([key, value]) => {
    imageLoadArr.push(loadImage(value));
  });

  state.resources[0] = await Promise.all(imageLoadArr);
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
