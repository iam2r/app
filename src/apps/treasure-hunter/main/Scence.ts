import { Events, ScreenState } from "@/apps/treasure-hunter/const";
import context, { emitter } from "@/apps/treasure-hunter/context";
import Background from "@/apps/treasure-hunter/components/Background";
import Explorer from "@/apps/treasure-hunter/components/Explorer";
import Door from "@/apps/treasure-hunter/components/Door";
import SpineBoy from "@/apps/treasure-hunter/components/SpineBoy";
import Fighter from "@/apps/treasure-hunter/components/Fighter";
import ParallaxScroller from "@/apps/treasure-hunter/components/ParallaxScroller";
import { Resources } from "@/apps/treasure-hunter/resource";
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
