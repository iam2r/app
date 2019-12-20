import { Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
export default class Door extends Sprite {
  constructor() {
    super();
    this.initDoor();
  }

  private initDoor() {
    this.texture = Resources["main"].textures["door.png"];
    this.position.set(32, 0);
  }
}
