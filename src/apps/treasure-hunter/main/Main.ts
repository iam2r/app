import "pixi-spine";
import "pixi-heaven";
import Vue from "vue";
import { Application, utils } from "pixi.js";
import App from "@/apps/treasure-hunter/views/App.vue";
import { Events } from "@/apps/treasure-hunter/const/Events";
import { IResourceMap, loader } from "@/apps/treasure-hunter/resource";
import context, { emitter, config } from "@/apps/treasure-hunter/context";
import Scence from "./Scence";
import router from "./router";
import store from "./store";
import VueTouch from "vue-touch";

export interface IOptions {
  resource: IResourceMap;
}

export default class Main {
  constructor(options: IOptions) {
    context.resource = options.resource;
    emitter.once(Events.LOAD_COMPLETE, () => {
      this.initGame();
      this.initData();
    });
    loader.load();
  }

  private initGame() {
    this.initVue();
    this.initPixi();
    emitter.emit(Events.GAME_INIT);
  }

  public initData() {
    setTimeout(() => {
      //模拟数据请求
      //gameStart
      this.initScence();
      emitter.emit(Events.GAME_ENTER);
    }, 200);
  }

  private initPixi() {
    const options = utils.isMobile.any
      ? {
          ...config.size,
          resolution: window.devicePixelRatio || 1,
          autoResize: true,
        }
      : {
          ...config.size,
        };
    context.app = new Application(options);
    (document.querySelector("#app") as HTMLElement).appendChild(
      context.app.view
    );
  }

  private initVue() {
    Vue.config.productionTip = false;
    Vue.use(VueTouch, { name: "v-touch" });

    context.appVue = new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }

  protected initScence() {
    context.scence = new Scence();
    context.app.ticker.add(() => {
      emitter.emit(Events.TICKER);
    });
  }
}
