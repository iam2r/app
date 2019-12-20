import { Sprite, utils, Point, Application } from "pixi.js";

export default class Drag extends utils.EventEmitter {
  constructor(sprite: Sprite | PIXI.spine.Spine, app?: Application) {
    super();
    this.sprite = sprite;
    this.app = app;
    this.initEvents();
  }
  private app: Application;
  private sprite: Sprite | PIXI.spine.Spine;
  private dragging = false;
  private data: any = null;
  private diff: Point = new Point();

  private initEvents(remove?: boolean) {
    this.sprite.interactive = !remove;
    this.sprite.buttonMode = !remove;
    const event = remove ? "off" : "on";
    this.sprite[event]("pointerdown", this.handleEvent, this)
      [event]("pointerup", this.handleEvent, this)
      [event]("pointerupoutside", this.handleEvent, this)
      [event]("pointermove", this.handleEvent, this);
  }

  private onDragStart(e: any) {
    const scale =
      this.app && this.app.stage.scale ? this.app.stage.scale : { x: 1, y: 1 };
    this.data = e.data;
    this.dragging = true;
    this.diff.x = this.data.global.x - this.sprite.getGlobalPosition().x;
    this.diff.y = this.data.global.y - this.sprite.getGlobalPosition().y;
    this.diff.x /= scale.x;
    this.diff.y /= scale.y;
  }

  private onDragMove(e: any) {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.sprite.parent);
      this.sprite.x = newPosition.x - this.diff.x;
      this.sprite.y = newPosition.y - this.diff.y;
    }
  }

  private onDragEnd(e: any) {
    this.dragging = false;
    this.data = null;
  }

  private handleEvent(e: any) {
    switch (e.type) {
      case "pointerdown":
        this.onDragStart(e);
        break;
      case "pointermove":
        this.onDragMove(e);
        break;
      case "pointerup":
        this.onDragEnd(e);
        break;
      case "pointerupoutside":
        this.onDragEnd(e);
        break;
      default:
        break;
    }
  }

  public destroy() {
    this.initEvents(true);
  }
}
