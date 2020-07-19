import { Sprite, Texture } from "pixi.js";
import { Resources } from "@/apps/treasure-hunter/resource";
import { config, emitter } from "@/apps/treasure-hunter/context";
import KeyBoard from "@/apps/treasure-hunter/utils/KeyBoard";
import context from "@/apps/treasure-hunter/context";
import { Events } from "@/apps/treasure-hunter/const";
import store from "@/apps/treasure-hunter/main/store";
import Drag from "@/apps/treasure-hunter/utils/Drag";

export default class Explorer extends Sprite {
  private keyBoardList: { [key: string]: KeyBoard } = {};
  private vx = 0;
  private vy = 0;
  private speed = 5;
  private speedEffect = 2;

  constructor(texture?: Texture) {
    super(texture);
    this.initExplorer();
    emitter.on(Events.TICKER, () => {
      this.parent && this.ticker();
    });
  }

  private initExplorer() {
    this.texture = Resources["main"].textures["explorer.png"];
    this.position.set(68, config.size.height / 2 - this.height / 2);
    this.vx = this.vy = 0;
    new Drag(this, context.app);
    this.on("pointerdown", () => {
      this.active = true;
    });
  }

  public get active(): boolean {
    return JSON.stringify(this.keyBoardList) != "{}";
  }

  public set active(val: boolean) {
    if (this.active == val) return;
    this.initKeyBoard(!val);
    this.scale.set(val ? 1.5 : 1);
  }

  private initKeyBoard(remove?: boolean) {
    if (remove) {
      for (const key in this.keyBoardList) {
        this.keyBoardList[key] && this.keyBoardList[key].destroy();
      }
      return this.keyBoardList == {};
    }

    const doSpeedEffect = () => {
      if (this.keyBoardList.shift.isDown) {
        this.vx *= this.speedEffect;
        this.vy *= this.speedEffect;
      }
    };

    this.keyBoardList.left = new KeyBoard(
      [37, 65],
      () => {
        this.vx = -1 * this.speed;
        doSpeedEffect();
      },
      () => {
        this.vx = 0;
      }
    );

    this.keyBoardList.right = new KeyBoard(
      [39, 68],
      () => {
        this.vx = 1 * this.speed;
        doSpeedEffect();
      },
      () => {
        this.vx = 0;
      }
    );

    this.keyBoardList.up = new KeyBoard(
      [38, 87],
      () => {
        this.vy = -1 * this.speed;
        doSpeedEffect();
      },
      () => {
        this.vy = 0;
      }
    );

    this.keyBoardList.down = new KeyBoard(
      [40, 83],
      () => {
        this.vy = 1 * this.speed;
        doSpeedEffect();
      },
      () => {
        this.vy = 0;
      }
    );

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
}
