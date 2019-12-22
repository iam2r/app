import "./Preloading.scss";
import { EventEmitter } from "events";
import { loadJson, loadFont, h, createElement } from "@/common/Utils";
import state from "app.root/state";
export default class Preloading extends EventEmitter {
  private $el: HTMLElement;
  private cubes: any[] = [
    {
      delay: 0,
      color: "#85a2b6"
    },
    {
      delay: 0.1,
      color: "#bbcedd"
    },
    {
      delay: 0.2,
      color: "#dce4eb"
    },
    {
      delay: 0.1,
      color: "#bbcedd"
    },
    {
      delay: 0.2,
      color: "#dce4eb"
    },
    {
      delay: 0.3,
      color: "#d69293"
    },
    {
      delay: 0.2,
      color: "#dce4eb"
    },
    {
      delay: 0.3,
      color: "#d69293"
    },
    {
      delay: 0.4,
      color: "#be5960"
    }
  ];

  public async init() {
    this.once("destory", () => this.destory());
    document
      .querySelector("body")
      .appendChild((this.$el = createElement(this.render(h))));
    const appData = (await loadJson("../apps.json?" + +new Date())) as any;
    state.appList = appData.apps.filter(it => it !== "home");
    state.resources = appData.resources.home;
    await loadFont(["Source Sans Pro", "Dosis"]).catch(error => {
      console.log("font preload error");
      this.emit("loaded");
    });
    this.emit("loaded");
  }

  protected render(h: Function) {
    return (
      <div id="loading-box">
        <div class="sk-cube-grid">
          {this.cubes.map((item: any) => (
            <div
              class="sk-cube"
              style={{
                "background-color": item.color,
                "animation-delay": item.delay + "s"
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  public destory() {
    const end = () => {
      this.$el.removeEventListener("transitionend", end);
      this.$el.parentNode.removeChild(this.$el);
      this.$el = null;
    };
    this.$el.addEventListener("transitionend", end, { once: true });
    this.$el.style.opacity = "0";
  }
}
