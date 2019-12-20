import { Sprite, Container } from "pixi.js";
import { resolution, emitter } from "app.root/context";
import { Resources } from "app.root/resource";
import { Events } from "app.root/const";
export default class ParallaxScroller extends Container {
  constructor() {
    super();
    this.initParallaxScroller();
    emitter.on(Events.TICKER, () => {
      this.parent && this.ticker();
    });
    emitter.on(Events.STATE_CHANGE, () => {
      this.parent && this.onStateChange();
    });
  }

  private postition = 0;
  private background: Sprite[] = [];
  private foreground: Sprite[] = [];
  private initParallaxScroller() {
    Array.from({ length: 2 }).forEach(() => {
      const background = new Sprite(
        Resources.scrollerBg.textures["bgtile.jpg"]
      );
      background.scale.set(this.scaleValue);
      const foreground = new Sprite(
        Resources.scrollerBg.textures["ground.png"]
      );
      foreground.scale.set(this.scaleValue);
      foreground.anchor.set(0, 0.7);
      foreground.y = resolution.size.height;
      this.background.push(background);
      this.foreground.push(foreground);
    });

    this.addChild(...this.background, ...this.foreground);
  }

  private setParallaxScroller(
    sprites: Sprite[],
    postition: number = this.postition
  ) {
    const width = sprites[0].width;
    const [first, clone] = sprites;
    first.x = -postition;
    first.x %= width * 2;
    if (first.x < 0) {
      first.x += width * 2;
    }
    first.x -= width;
    clone.x = -postition + width;
    clone.x %= width * 2;
    if (clone.x < 0) {
      clone.x += width * 2;
    }
    clone.x -= width;
  }

  private ticker() {
    this.postition += 10;
    this.setParallaxScroller(this.background, this.postition * 0.6);
    this.setParallaxScroller(this.foreground);
  }

  private get scaleValue(): number {
    return resolution.size.height / 600;
  }

  public onStateChange() {
    Array.from({ length: 2 }).forEach((item, i) => {
      this.background[i].scale.set(this.scaleValue);
      this.foreground[i].scale.set(this.scaleValue);
      this.foreground[i].y = resolution.size.height;
    });
  }
}
