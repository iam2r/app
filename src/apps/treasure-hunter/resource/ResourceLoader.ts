import { Loader } from "pixi.js";
import { Events } from "../const";
import context, { emitter } from "../context";
import { IResource } from "./IResource";

export const pixiLoader = new Loader();

export class ResourceLoader {
  public async load() {
    await this.loadJson();
    await this.loadFonts();
    await this.loadImages();
    emitter.once(Events.GAME_INIT, () => this.loadSounds());
  }

  protected loadImages() {
    const res = {
      ...context.resource.base,
      ...context.resource.html,
    };

    this.loadResource(res);
  }

  protected loadJson() {}

  protected loadFonts() {}

  protected loadSounds() {}

  private interator(res: IResource, cb: (key: string, path: string) => void) {
    for (const k in res) {
      const item: any = res[k];
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
    const resources = pixiLoader.resources;
    this.interator(res, (key: string, path: string) => {
      if (!resources[key]) pixiLoader.add(key, path);
    });

    pixiLoader
      .load(() => {
        emitter.emit(Events.LOAD_COMPLETE);
      })
      .onProgress.add(() =>
        emitter.emit(Events.LOAD_PROGRESS, pixiLoader.progress)
      );
  }
}
