import { Sprite, Texture } from "pixi.js";
export default class Door extends Sprite {
  constructor(texture?: Texture) {
    super(texture);
    this.initDoor();
  }

  private initDoor() {
    this.position.set(32, 0);
  }
}
