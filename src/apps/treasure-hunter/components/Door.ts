import { Container, Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
export default class Door extends Container {
    private door: Sprite;
    constructor() {
        super();
        this.initDoor();
    }

    private initDoor() {
        this.door = new Sprite(Resources['main'].textures["door.png"]);
        this.position.set(32,0);
        this.addChild(this.door);
    }
};