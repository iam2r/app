import { Events, ScreenState } from "app.root/const";
import context, { emitter } from "app.root/context";
import Background from "app.root/components/Background";
import Explorer from "app.root/components/Explorer";
import Door from "app.root/components/Door";
import SpineBoy from "app.root/components/SpineBoy";
import Fighter from "app.root/components/Fighter";
import ParallaxScroller from "app.root/components/ParallaxScroller";
import { Resources } from "app.root/resource";
import store from "./store";
import Size from "./Size";

export default class Scence {
  public parallaxScroller: ParallaxScroller;
  public background: Background;
  public door: Door;
  public explorer: Explorer;
  public spineBoy: SpineBoy;
  public fighter: Fighter;
  constructor() {
    this.init();
    emitter
      .on(Events.RESIZE, (scale: number, renderSize: Size) =>
        this.onResize(scale, renderSize)
      )
      .on(Events.STATE_CHANGE, (state: ScreenState) =>
        this.onStateChange(state)
      );
  }

  protected onResize(scale: number, renderSize: Size) {
    const app = context.app;
    app.renderer.resize(renderSize.width, renderSize.height);
    app.stage.scale.set(scale);
    const size = context.resolution.size;
    store.state.scale = scale;
    store.state.width = size.width;
    store.state.height = size.height;
  }

  protected onStateChange(state: ScreenState) {
    store.state.state = state;
  }

  protected init() {
    this.initComponent();
  }

  protected initComponent() {
    this.parallaxScroller = new ParallaxScroller();
    this.background = new Background(Resources.main.textures["dungeon.png"]);
    this.door = new Door(Resources.main.textures["door.png"]);
    this.explorer = new Explorer(Resources.main.textures["explorer.png"]);
    this.spineBoy = new SpineBoy(Resources.spineboy.spineData);
    this.fighter = new Fighter(Object.values(Resources.fighter.textures));
    context.app.stage.addChild(
      this.parallaxScroller,
      this.spineBoy,
      this.fighter
    );
  }
}
