import { Container, Sprite } from "pixi.js";
import { resolution } from "app.root/context";
import Size from "app.root/main/Size";
import { Resources } from "app.root/resource";
export default class Background extends Container {
    private background: Sprite;
    constructor() {
        super();

        this.initBackground();
    }

    private initBackground() {
        this.background = new Sprite(Resources['main'].textures["dungeon.png"]);
        this.background.anchor.set(0.5);
        this.addChild(this.background);
    }



    public onResize(scale: number, renderSize: Size) {
        const center = resolution.size.center;
        this.background.position.set(center.x, center.y);
        let size = resolution.size;
        let innerSize = new Size(size.width * scale, size.height * scale);
        let wScale = renderSize.width / innerSize.width, hScale = renderSize.height / innerSize.height;
        this.background.scale.set(Math.max(wScale, hScale));
    }
};