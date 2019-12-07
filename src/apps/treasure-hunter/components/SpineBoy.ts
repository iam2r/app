import { Container, Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
import context, { config, emitter } from 'app.root/context';
import { Events } from 'app.root/const';
import store from 'app.root/main/store';
import Drag from '../utils/Drag';

export default class SpineBoy extends Container {
    constructor() {
        super();
        this.initspineBoy();
    }
    public spine: PIXI.spine.Spine;

    private initspineBoy() {
        this.spine = new PIXI.spine.Spine(Resources['spineboy'].spineData);
        this.spine.scale.set(0.4);
        this.spine.position.set(config.size.width / 2, config.size.height - 30);
        this.addChild(this.spine);
        new Drag(this.spine, context.app);

        this.spine.on('pointerdown', () => {
            const singleAnimations = ['aim', 'death', 'jump', 'portal'];
            const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
            const allAnimations = [].concat(singleAnimations, loopAnimations);

            let lastAnimation = '';
            let animation = '';
            do {
                animation = allAnimations[Math.floor(Math.random() * allAnimations.length)];
            } while (animation === lastAnimation);

            this.spine.state.setAnimation(0, animation, loopAnimations.includes(animation));
            lastAnimation = animation;
        })



    }

} 