import { ScreenState, Events } from "app.root/const";
import { emitter, device } from "./";
import config from "./config";

export class Size {
    public width: number;
    public height: number;
    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
    }

    public get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    public get ratio() {
        return this.width / this.height;
    }
}

export class Resolution {
    public size: Size; // 游戏尺寸
    public scale: number = 1; //缩放比例
    public state: ScreenState;
    public renderSize: Size; // 游戏实际渲染大小

    constructor() {
        let size = config.size;
        this.size = new Size(size.width, size.height);

        window.addEventListener("resize", () => this.onResize());
        emitter.once(Events.GAME_ENTER, () => {
            this.onResize();
            emitter.emit(Events.STATE_CHANGE, this.state);
        });

        this.onResize();
    }

    private onResize() {
        this.doState();
        this.doResize();
    }

    private doState() {
        let toState = device.screenState;
        if (toState === this.state) return;

        let oldState = this.state;
        this.state = toState;

        this.size = this.isPortrait ?
            new Size(config.size.height, config.size.width) :
            new Size(config.size.width, config.size.height);

        emitter.emit(Events.STATE_CHANGE, this.state, oldState);
    }

    private doResize() {

        let winSize = new Size(innerWidth, innerHeight);
        let size = this.size;
        let scale = winSize.ratio > size.ratio ?
            winSize.height / size.height :
            winSize.width / size.width;
        let renderSize = new Size(size.width * scale, size.height * scale);

        this.scale = scale;
        this.renderSize = winSize;
        emitter.emit(Events.RESIZE, scale, winSize);
    }

    public get isPortrait() {
        return this.state === ScreenState.PORTRAIT;
    }

    public get isLandscape() {
        return this.state === ScreenState.LANDSCAPE;
    }
}