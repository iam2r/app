import { utils, Loader } from "pixi.js";
import { Events } from "../const";
import context, { emitter } from "../context";
import { IResource } from "./IResource";

export class ResourceLoader extends utils.EventEmitter {
    private cb: Function;

    public load(cb: Function) {
        this.cb = cb;
        this.runLoad();
    }

    protected runLoad() {
        this.loadJson(() => {
            this.loadFonts(() => {
                this.loadImages(() => {
                    this.cb && this.cb();
                });
            });
        });

        emitter.once(Events.GAME_INIT, () => this.loadSounds());
    }

    protected loadImages(cb: Function) {
        let res = context.resource.base;
        res = {
            ...res,
            ...context.resource.html
        };

        this.loadResource(res, () => {
            cb && cb();
        });
    }

    protected loadJson(cb: Function) {
        cb && cb();
    }

    protected loadFonts(cb: Function) {

    }

    protected loadSounds() {

    }

    private interator(res: IResource, cb: (key: string, path: string) => void) {
        for (let k in res) {
            let item: any = res[k];
            if (item instanceof Array) {
                (item as Array<string>).forEach((path, i) => {
                    cb(k + "_" + i, path);
                });
            } else if (typeof item === "string") {
                cb(k, item as string);
            }
        }
    }



    private loadResource(res: IResource, cb: Function) {
        const loader = new Loader();
        let resources = loader.resources;
        this.interator(res, (key: string, path: string) => {
            if(!resources[key]) 
                loader.add(key, path); 
        });
        let emitter = context.emitter;
        let fn = () => emitter.emit(Events.LOAD_PROGRESS, loader.progress);
        loader
            .on("progress", fn)
            .load(() => {
                loader.off("progress", fn);
                emitter.emit(Events.LOAD_COMPLETE);
                cb && cb();
            });
    }


}