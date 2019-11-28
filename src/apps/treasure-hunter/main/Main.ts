import Scence from './Scence';
import { Application, utils } from "pixi.js";
import { Events } from 'app.root/const/Events';
import { IResourceMap, loader } from 'app.root/resource';
import context, { emitter, config } from "app.root/context";

export interface IOptions {
    resource: IResourceMap,
}

export default class Main {
    constructor(options: IOptions) {
        context.resource = options.resource;
        emitter.once(Events.LOAD_COMPLETE,() => {
            this.initPixi();
            emitter.emit(Events.GAME_INIT);
            this.initData();
        })
        loader.load()
    }

    public initData() {
        setTimeout(() => {
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

    protected initScence() {
        let scence = new Scence();
        let app = context.app as Application;
        app.stage.addChild(scence);
      
    }



}


