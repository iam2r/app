import EventEmitter from "@/common/EventEmitter";
import querystring from "querystring";
import { Events } from "@/apps/treasure-hunter/const";
import FullScreen from "./FullScreen";
import { emitter, resolution, device } from "@/apps/treasure-hunter/context";
import "./Loader.scss";

export class Loader extends EventEmitter {
  private elContainer: HTMLElement;
  private elProgress: HTMLElement;
  private elText: HTMLElement;

  private init() {
    const params = querystring.parse(location.search.slice(1));
    document.body.setAttribute(
      "data-browser",
      (() => {
        for (const key in device.browser) {
          if ((device.browser as any)[key]) {
            return key;
          }
        }
      })()
    );
    document.body.innerHTML += `
            <div class="loader-page">
                <div class="container">
                    <i class="logo"></i>
                    <div class="progress">
                        <span class="bar"></span>
                    </div>
                    <i class="message">${
                      params.language == "zh_CN" ? "加载中..." : "Loading..."
                    }</i>
                </div>
                <div class="mask"></div>
            </div>
        `;
    if (device.mobile.device) new FullScreen();
    this.elContainer = document.querySelector(".loader-page .container");
    this.elProgress = document.querySelector(".loader-page .bar");
    this.elText = document.querySelector(".loader-page .message");

    this.resize();
  }

  public load() {
    this.emit("load");
    this.init();
    this.bindEvents();
  }

  private bindEvents() {
    const onResize = () => this.resize();
    const onProgress = (per: number) => (this.progress = per);
    const onText = (txt: string) => (this.text = txt);
    const onError = (err: string) => (this.text = err);

    emitter
      .on(Events.RESIZE, onResize)
      .on(Events.LOAD_PROGRESS, onProgress)
      .on(Events.LOAD_TEXT, onText)
      .on(Events.LOAD_ERROR, onError)
      .once(Events.GAME_ENTER, () => {
        emitter
          .off(Events.RESIZE, onResize)
          .off(Events.LOAD_PROGRESS, onProgress)
          .off(Events.LOAD_TEXT, onText)
          .off(Events.LOAD_ERROR, onError);
        this.complete();
      });
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  private set progress(value: number) {
    this.elProgress.style.width = value + "%";
  }

  private set text(value: string) {
    this.elText.innerText = value;
  }

  private resize() {
    this.elContainer.style.transform =
      "translate(-50%,-50%) scale(" + resolution.scale + ")";
    this.elContainer.style.width = `${100 / resolution.scale}% `;
    this.elContainer.style.height = `${100 / resolution.scale}% `;
  }

  private complete() {
    const el = document.querySelector<HTMLElement>(".loader-page");
    const mask = el.querySelector<HTMLElement>(".mask");
    mask.style.opacity = "1";
    mask.addEventListener("transitionend", () => {
      el.style.opacity = "0";
      el.addEventListener("transitionend", () => {
        document.querySelector("body").removeChild(el);
      });
    });
  }
}
