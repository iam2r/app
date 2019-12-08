import { AnimatedSprite, Texture } from "pixi.js";
import { config, emitter, resolution } from 'app.root/context';
import { Events } from 'app.root/const';

export default class Fighter extends AnimatedSprite {
    constructor(textures: Texture[] | AnimatedSprite.FrameObject[], autoUpdate?: boolean) {
        super(textures, autoUpdate);
        this.initFighter();
        emitter.on(Events.STATE_CHANGE, () => { this.parent && this.onStateChange() });
    }


    private initFighter() {
        this.position.set(resolution.size.width / 2, 30 + this.height / 2);
        this.rotation = Math.PI / 2;
        this.anchor.set(0.5);
        this.animationSpeed = 0.5;
        this.play();
    }

    private onStateChange(){
        this.position.set(resolution.size.width / 2, 30 + this.height / 2);
    }

};