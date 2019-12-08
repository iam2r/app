import { Container, Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
import context, { config, emitter } from 'app.root/context';
import KeyBoard from 'app.root/utils/KeyBoard';
import { Events } from 'app.root/const';
import store from 'app.root/main/store';
import Drag from '../utils/Drag';

export default class SpineBoy extends Sprite {
    constructor() {
        super();
        this.initspineBoy();
    }
    private spine: PIXI.spine.Spine;
    private keyBoardList: { [key: string]: KeyBoard } = {};
    private vx: number = 0;
    private vy: number = 0;
    private speed: number = 5;
    private speedEffect: number = 2;

    private initspineBoy() {
        this.spine = new PIXI.spine.Spine(Resources['spineboy'].spineData);
        this.spine.scale.set(0.2);
        this.spine.position.set(config.size.width / 2, config.size.height - 30);
        this.addChild(this.spine);
       

        this.spine.interactive = true;
        this.spine.buttonMode = true;
        this.spine.on('pointerdown', () => {
            this.active = true;


            // let lastAnimation = '';
            // let animation = '';
            // do {
            //     animation = allAnimations[Math.floor(Math.random() * allAnimations.length)];
            // } while (animation === lastAnimation);

            // this.spine.state.setAnimation(0, animation, loopAnimations.includes(animation));
            // lastAnimation = animation;
        })


        emitter.on(Events.TICKER, () => { this.ticker() });

    }

    public get active(): boolean {
        return JSON.stringify(this.keyBoardList) != '{}'
    }

    public set active(val: boolean) {
        if (this.active == val) return;
        this.initKeyBoard(!val);
        this.doAnimation('idle');
    }


    private doAnimation(animation: 'aim' | 'death' | 'jump' | 'portal' | 'hoverboard' | 'idle' | 'run' | 'shoot' | 'walk') {
        const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk'];
        this.spine.state.setAnimation(0, animation, loopAnimations.includes(animation));
    }

    private initKeyBoard(remove?: boolean) {
        if (remove) {
            for (const key in this.keyBoardList) {
                this.keyBoardList[key] && this.keyBoardList[key].destroy();
            }
            return this.keyBoardList == {};
        }

        let doSpeedEffect = () => {
            if (this.keyBoardList.shift.isDown) {
                this.vx&&this.doAnimation('run');
                this.vx *= this.speedEffect;
                this.vy *= this.speedEffect;
            }else{
                this.doAnimation('walk');
            }
        }

        this.keyBoardList.left = new KeyBoard([37, 65], () => {
            this.vx = -1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vx = 0;
            this.doAnimation('aim');
        });


        this.keyBoardList.right = new KeyBoard([39, 68], () => {
            this.vx = 1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vx = 0;
            this.doAnimation('aim');
        });


        this.keyBoardList.shift = new KeyBoard(16, doSpeedEffect, () => {
            this.vx /= this.speedEffect;
            this.vy /= this.speedEffect;
        });


        this.keyBoardList.space = new KeyBoard(32, () => {
            this.doAnimation('jump');
        });
    }

    private ticker() {
        this.spine.x += this.vx;
        this.spine.y += this.vy;
        // store.state.bump.contain(this, store.state.contain, true);
    }

} 