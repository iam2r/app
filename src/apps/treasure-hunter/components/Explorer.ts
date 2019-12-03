import { Container, Sprite } from "pixi.js";
import { Resources } from "app.root/resource";
import { config } from 'app.root/context';
import KeyBoard from 'app.root/utils/KeyBoard';
import context from 'app.root/context';
import store from 'app.root/main/store';

export default class Explorer extends Container {
    private keyBoardList: { [key: string]: KeyBoard } = {};
    private explorer: Sprite;
    private vx: number = 0;
    private vy: number = 0;
    constructor() {
        super();
        this.initExplorer();
        this.initKeyBoard();
    }

    private initExplorer() {
        this.explorer = new Sprite(Resources['main'].textures["explorer.png"]);
        this.explorer.position.set(68, config.size.height / 2 - this.height / 2);
        this.vx = this.vy = 0;
        this.addChild(this.explorer);
        context.app.ticker.add(() => { this.play() })
    }

    private initKeyBoard() {
        this.keyBoardList.left = new KeyBoard(37, () => {
            this.vx = -5;
            this.vy = 0;
        }, () => {
            if (!this.keyBoardList.right.isDown && this.vy === 0) {
                this.vx = 0;
            }
        });



        this.keyBoardList.right = new KeyBoard(39, () => {
            this.vx = 5;
            this.vy = 0;
        }, () => {
            if (!this.keyBoardList.left.isDown && this.vy === 0) {
                this.vx = 0;
            }
        });



        this.keyBoardList.up = new KeyBoard(38, () => {
            this.vx = 0;
            this.vy = -5;
        }, () => {
            if (!this.keyBoardList.down.isDown && this.vx === 0) {
                this.vy = 0;
            }
        });

        this.keyBoardList.down = new KeyBoard(40, () => {
            this.vx = 0;
            this.vy = 5;
        }, () => {
            if (!this.keyBoardList.up.isDown && this.vx === 0) {
                this.vy = 0;
            }
        });

    }

    private play() {
        this.x += this.vx;
        this.y += this.vy;
        store.state.bump.contain(this.explorer, context.scence.background)
    }
};