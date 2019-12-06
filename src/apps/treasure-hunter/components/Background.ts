import { Sprite } from "pixi.js";
import { resolution } from "app.root/context";
import { Resources } from "app.root/resource";
export default class Background extends Sprite {
    constructor() {
        super();
        this.initBackground();
    }

    private initBackground() {
        this.texture = Resources['main'].textures["dungeon.png"];
    }

    public onStateChange() {
        const center = resolution.size.center;
        this.position.set(center.x - this.width / 2, center.y - this.height / 2);
    }
};