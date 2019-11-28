import { utils,Loader } from "pixi.js";
import { Events } from "../const";
import context, { emitter } from "../context";
import { IResource } from "./IResource";


export const pixiLoader = new Loader();

export class ResourceLoader extends utils.EventEmitter {

    public async load() {
        await this.loadJson();
        await this.loadFonts();
        await this.loadImages();
        emitter.once(Events.GAME_INIT, () => this.loadSounds());
    }

    protected loadImages() {
        let res = {
            ...context.resource.base,
            ...context.resource.html
        };

        this.loadResource(res);
    }

    protected loadJson() {

    }

    protected loadFonts() {

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



    private loadResource(res: IResource) {
        let resources = pixiLoader.resources;
        this.interator(res, (key: string, path: string) => {
            if (!resources[key])
            pixiLoader.add(key, path);
        });
        let fn = () => emitter.emit(Events.LOAD_PROGRESS, pixiLoader.progress);
        pixiLoader
            .on("progress", fn)
            .load(() => {
                pixiLoader.off("progress", fn);
                emitter.emit(Events.LOAD_COMPLETE);
            });
    }


}