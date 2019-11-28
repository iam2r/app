import { Container, Application } from "pixi.js";
import { Events, ScreenState } from 'app.root/const';
import context, { emitter } from 'app.root/context';
import Size from "./Size";
import Background from 'app.root/components/Background';

export default class Scence extends Container {
    protected background: Background;
    constructor() {
        super();
        this.init();
        emitter
            .on(Events.RESIZE, (scale: number, renderSize: Size) => this.onResize(scale, renderSize))
            .on(Events.STATE_CHANGE, (state: ScreenState) => this.onStateChange(state));
    }

    protected onResize(scale: number, renderSize: Size) {
        const app = context.app as Application;
        app.renderer.resize(renderSize.width, renderSize.height);
        app.stage.scale.set(scale);

        let size = context.resolution.size;
        let innerSize = new Size(size.width * scale, size.height * scale);
        app.stage.x = (renderSize.width - innerSize.width) * 0.5;
        app.stage.y = (renderSize.height - innerSize.height) * 0.5;


        this.background.onResize(scale, renderSize)

    }

    protected onStateChange(state: ScreenState) {

    }

    protected init() {
        this.initComponent();
    }

    protected initComponent() {
        this.initBackground();
    }

    protected initBackground() {
        this.background = new Background();
        this.addChild(this.background)
    }
}