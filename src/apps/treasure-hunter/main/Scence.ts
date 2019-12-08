import { Container, Application } from "pixi.js";
import { Events, ScreenState } from 'app.root/const';
import context, { emitter } from 'app.root/context';
import { resolution } from "app.root/context";
import Background from 'app.root/components/Background';
import Explorer from 'app.root/components/Explorer';
import Door from 'app.root/components/Door';
import SpineBoy from 'app.root/components/SpineBoy';
import store from "./store";
import Size from "./Size";

export default class Scence extends Container {
    public background: Background;
    public door: Door;
    public explorer: Explorer;
    public spineBoy: SpineBoy;
    constructor() {
        super();
        this.init();
        emitter
            .on(Events.RESIZE, (scale: number, renderSize: Size) => this.onResize(scale, renderSize))
            .on(Events.STATE_CHANGE, (state: ScreenState) => this.onStateChange(state));
    }

    protected onResize(scale: number, renderSize: Size) {
        const app = context.app;
        app.renderer.resize(renderSize.width, renderSize.height);
        app.stage.scale.set(scale);
        let size = context.resolution.size;
        store.state.scale = scale;
        store.state.width = size.width;
        store.state.height = size.height;
    }

    protected onStateChange(state: ScreenState) {
        store.state.state = state;
        this.background.onStateChange();
    }

    protected init() {
        this.initComponent();
    }

    protected initComponent() {
        this.background = new Background();
        this.door = new Door();
        this.explorer = new Explorer();
        this.spineBoy = new SpineBoy();
        this.addChild(this.background, this.door, this.explorer, this.spineBoy)
    }


}