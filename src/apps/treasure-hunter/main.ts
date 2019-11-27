
import * as PIXI from "pixi.js";
import { Events } from './const/Events';
import resource, { IResourceMap, loader } from './resource';
import context, { emitter } from "./context";

export interface IOptions {
    resource: IResourceMap,
}

export class Main {
    constructor(options: IOptions) {
        context.resource = options.resource;
        loader.load(() => {
            this.initPixi();
            emitter.emit(Events.GAME_INIT);
        });
    }

    private initPixi() {
        let options = {
            width: 1472,
            height: 828,
            antialiasing: true,
            transparent: false,
            resolution: 1
        }
        let app: PIXI.Application = new PIXI.Application(options);
        (document.querySelector("#app") as HTMLElement).appendChild(app.view);
        context.app = app
    }

}


new Main({ resource });
