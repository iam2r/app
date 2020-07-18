import Vue from "vue";
import App from "./App";
import state from "./state";
import { loadFont, loadImage, loadJson, updateUrl2Blob } from "@/common/Utils";
import { emitter } from "app.root/context";
const VueTouch = require("vue-touch");

Vue.config.productionTip = false;
Vue.use(VueTouch, { name: "v-touch" });

const loadImages = async (imagesList: any) => {
  for (let index = 0; index < imagesList.length; index++) {
    const element = imagesList[index];
    element.blob = await loadImage(element.url, true);
  }
  return imagesList;
};

const loading = async () => {
  const appData = (await loadJson("../apps.json?" + +new Date())) as any;
  const [imgResources] = await Promise.all([
    loadImages(appData.resources.birthday.filter((it) => (it.type = "images"))),
    loadFont(require("fontfaceobserver"), ["Lato"]),
  ]);
  emitter.emit("loaded", imgResources);
};

emitter.once("loaded", (imgResources) => {
  imgResources.forEach(({ url, blob }) => {
    updateUrl2Blob(url, blob);
  });

  state.app = new Vue({
    render: (h) => h(App),
  }).$mount("#app");
});

loading();
