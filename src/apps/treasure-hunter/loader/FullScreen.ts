import { resolution, device } from "../context";
import "./FullScreen.scss";

export default class FullScreen {
  private element: HTMLElement;
  private preventTouchEvent = true;
  constructor() {
    this.init();
    this.onStateChange();
    this.initEvents();
  }

  private init() {
    const scale = resolution.scale;
    const element: HTMLElement = (this.element = document.createElement("div"));
    element.className = "fullscreen";
    element.innerHTML = `
            <div class="container">
                <div class="icon-box" style="transform:scale(${scale}) translate(-50%,-50%)">
                </div>
            </div>`;
    this.element.style.visibility = "hidden";
    document.body.appendChild(element);
  }

  private onStateChange() {
    const isPortrait = resolution.isPortrait;
    if (device.mobile.ios && !device.mobile.tablet) {
      const clientHeight = document.documentElement.clientHeight;
      const hasNavBar = isPortrait
        ? window.innerHeight == clientHeight
        : window.innerHeight < clientHeight;
      const showFullScreen = hasNavBar;
      this.element.style.visibility = showFullScreen ? "visible" : "hidden";
      (document.querySelector(
        "#app"
      ) as HTMLElement).style.pointerEvents = showFullScreen ? "none" : "";
      this.preventTouchEvent = !showFullScreen;
      window.scrollTo(0, 0);
    }
  }

  private onTouchFullScreen() {
    const de = <any>document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen();
    }
  }

  private onPreventTouch(e: TouchEvent) {
    if (this.preventTouchEvent || e.touches.length > 1) {
      e.preventDefault();
    }
  }

  private doClick(e: any) {
    let target = e.target,
      ev;
    if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
      ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        true,
        e.view,
        1,
        target.screenX,
        target.screenY,
        target.clientX,
        target.clientY,
        e.ctrlKey,
        e.altKey,
        e.shiftKey,
        e.metaKey,
        0,
        null
      );
      target.dispatchEvent(ev);
    }
  }

  private initEvents(remove?: boolean) {
    const eventType = remove
      ? (el: any, type: string, fn: any, options?: any) => {
          el.removeEventListener(type, fn, options);
        }
      : (el: any, type: string, fn: any, options?: any) => {
          el.addEventListener(type, fn, options);
        };

    eventType(window, "touchstart", this, { passive: false });
    eventType(window, "touchend", this);
    eventType(window, "touchcancel", this);

    eventType(window, "resize", this);
    eventType(window, "orientationchange", this);
  }

  protected handleEvent(e: Event | TouchEvent) {
    switch (e.type) {
      case "touchstart":
        this.onPreventTouch(e as TouchEvent);
        break;
      case "touchend":
      case "touchcancel":
        this.doClick(e);
        if (device.mobile.andriod) {
          this.onTouchFullScreen();
        }
        break;
      case "resize":
      case "orientationchange":
        this.onStateChange();
        break;
    }
  }
}
