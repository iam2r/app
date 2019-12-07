import { Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
import { config, emitter } from 'app.root/context';
import KeyBoard from 'app.root/utils/KeyBoard';
import context from 'app.root/context';
import { Events } from 'app.root/const';
import store from 'app.root/main/store';
import Drag from 'app.root/utils/Drag';

export default class Explorer extends Sprite {
    private keyBoardList: { [key: string]: KeyBoard } = {};
    private vx: number = 0;
    private vy: number = 0;
    private speed: number = 5;
    private speedEffect: number = 2;
    constructor() {
        super();
        this.initExplorer();
        this.initKeyBoard();
        emitter.on(Events.TICKER, () => { this.ticker() })
    }

    private initExplorer() {
        this.texture = Resources['main'].textures["explorer.png"];
        this.position.set(68, config.size.height / 2 - this.height / 2);
        this.vx = this.vy = 0;
        new Drag(this, context.app);
    }

    private initKeyBoard() {

        let doSpeedEffect = () => {
            if (this.keyBoardList.shift.isDown) {
                this.vx *= this.speedEffect;
                this.vy *= this.speedEffect;
            }
        }

        this.keyBoardList.left = new KeyBoard([37, 65], () => {
            this.vx = -1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vx = 0;
        });


        this.keyBoardList.right = new KeyBoard([39, 68], () => {
            this.vx = 1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vx = 0;
        });

        this.keyBoardList.up = new KeyBoard([38, 87], () => {
            this.vy = -1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vy = 0;
        });

        this.keyBoardList.down = new KeyBoard([40, 83], () => {
            this.vy = 1 * this.speed;
            doSpeedEffect();
        }, () => {
            this.vy = 0;
        });

        this.keyBoardList.shift = new KeyBoard(16, doSpeedEffect, () => {
            this.vx /= this.speedEffect;
            this.vy /= this.speedEffect;
        });

    }

    private ticker() {
        this.x += this.vx;
        this.y += this.vy;
        store.state.bump.contain(this, store.state.contain, true);
    }
};