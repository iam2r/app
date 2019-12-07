import { Sprite } from "pixi.js";
import { Resources } from "app.root/resource";

export default class SpineBoy extends Sprite {
    constructor() {
        super();
        this.initspineBoy();
    }
    private spine: PIXI.spine.Spine;

    private initspineBoy() {
        console.log(Resources)
        // this.spine = new PIXI.spine.Spine(Resources['spineboy'].spineData);
        // this.addChild(this.spine)
        this.position.set(32, 0);

    }
} 