import "./Preloading.scss";
import { EventEmitter } from "events";
import { loadJson, loadFont } from "@/common/Utils";
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
    this.render();
    const appData = (await loadJson("../apps.json?" + +new Date())) as any;
    state.appList = appData.apps.filter(it => it !== "home");
    state.resources = appData.resources.home;
    await loadFont(["Source Sans Pro:n3,n4,n6", "Dosis:n5"]).catch(error => {
      console.log("font preload error");
      this.leave();
    });

    this.leave();
  }

  protected render() {
    let child = ``;
    this.cubes.map(
      (item: any) =>
        (child += `<div
          class="sk-cube"
          style="background-color:${item.color};animation-delay:${item.delay}s"
        ></div>
        `)
    );

    let el = (this.$el = document.createElement("div"));
    el.setAttribute("id", "loading-box");
    el.innerHTML = `
     <div class="sk-cube-grid">
       ${child}
     </div>
   `;
    document.querySelector("body").appendChild(this.$el);
  }

  public leave() {
    const end = () => {
      if (this.$el) {
        this.$el.removeEventListener("transitionend", end);
        this.$el.parentNode.removeChild(this.$el);
        this.$el = null;
      }
    };
    this.$el.addEventListener("transitionend", end, { once: true });
    this.$el.style.opacity = "0";
    this.emit("loaded");
  }
}
