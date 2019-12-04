import { Container, Sprite } from "pixi.js";
import { resolution } from "app.root/context";
import { Resources } from "app.root/resource";
export default class Background extends Container {
    private background: Sprite;
    constructor() {
        super();
        this.initBackground();
    }

    private initBackground() {
        this.background = new Sprite(Resources['main'].textures["dungeon.png"]);
        this.addChild(this.background);
    }

    public onStateChange() {
        const center = resolution.size.center;
        this.position.set(center.x - this.width / 2, center.y - this.height / 2);
    }
};