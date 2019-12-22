import "./Preloading.scss";
import { emitter } from "app.root/context";
import JSXUtils from "@/common/JSXUtils";

export default class Preloading {
  constructor() {
    this.init();
  }
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

  public init() {
    emitter.once("loaded", () => this.destory());
    document
      .querySelector("body")
      .appendChild(
        (this.$el = JSXUtils.createElement(this.render(JSXUtils.h)))
      );
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
