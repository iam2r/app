import { Sprite, Texture } from "pixi.js";
import { resolution, emitter } from "@/apps/treasure-hunter/context";
import { Events } from "@/apps/treasure-hunter/const";
export default class Background extends Sprite {
  constructor(texture?: Texture) {
    super(texture);
    emitter.on(Events.STATE_CHANGE, () => {
      this.parent && this.onStateChange();
    });
  }

  public onStateChange() {
    const center = resolution.size.center;
    this.position.set(center.x - this.width / 2, center.y - this.height / 2);
  }
}
