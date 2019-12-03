import Vue from "vue";
import { Application, utils } from "pixi.js";
import App from "app.root/views/App.vue";
import { Events } from 'app.root/const/Events';
import { IResourceMap, loader } from 'app.root/resource';
import context, { emitter, config } from "app.root/context";
import Scence from './Scence';
import router from "./router";
import store from "./store";


export interface IOptions {
    resource: IResourceMap,
}

export default class Main {
    constructor(options: IOptions) {
        context.resource = options.resource;
        emitter.once(Events.LOAD_COMPLETE, () => {
            this.initGame();
            this.initData();
        })
        loader.load()
    }

    private initGame() {
        this.initVue();
        this.initPixi();
        emitter.emit(Events.GAME_INIT);
    }

    public initData() {
        setTimeout(() => {//模拟数据请求
            //gameStart
            this.initScence();
            emitter.emit(Events.GAME_ENTER);
        }, 200)
    }

    private initPixi() {
        let options = utils.isMobile.any ? {
            ...config.size,
            resolution: (window.devicePixelRatio || 1),
            autoResize: true
        } : {
                ...config.size,
            }
        let app: Application = new Application(options);
        (document.querySelector("#app") as HTMLElement).appendChild(app.view);
        context.app = app;


    }

    private initVue() {
        let appVue = new Vue({
            store,
            router,
            render: (h) => h(App)
        }).$mount("#app");

        context.appVue = appVue;
    }

    protected initScence() {
        let scence = new Scence();
        let app = context.app as Application;
        app.stage.addChild(scence);
        context.scence = scence;
    }



}
