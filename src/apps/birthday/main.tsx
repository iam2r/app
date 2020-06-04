import Vue from "vue";
import App from "./App";
import state from "./state";
import VuePlugin from "./VuePlugin";
import { loadFont, loadImage, loadJson } from "@/common/Utils";
import { emitter } from "app.root/context";
Vue.use(VuePlugin);

const loadImages = async (imagesList: any) => {
  for (let index = 0; index < imagesList.length; index++) {
    const element = imagesList[index];
    element.blob = await loadImage(element.url, true);
  }
  return imagesList;
};

const updateStyleSheets = (list: any) => {
  list.forEach(({ url, blob }) => {
    Array.from(document.styleSheets).forEach((styleSheet: CSSStyleSheet) => {
      Array.from(styleSheet.rules)
        .filter((cssRule) => cssRule.cssText.includes(url))
        .forEach(
          (cssRule: CSSStyleRule) =>
            (cssRule.style.backgroundImage = `url(${blob})`)
        );
    });
  });
};

const loading = async () => {
  const appData = (await loadJson("../apps.json?" + +new Date())) as any;
  const [resources] = await Promise.all([
    loadImages(appData.resources.birthday.filter((it) => (it.type = "images"))),
    loadFont(require("fontfaceobserver"), ["Lato"]),
  ]);
  state.resources = resources;
  updateStyleSheets(state.resources);
  emitter.emit("loaded");
};

emitter.once("loaded", () => {
  state.app = new Vue({
    render: (h) => h(App),
  }).$mount("#app");
});

loading();
