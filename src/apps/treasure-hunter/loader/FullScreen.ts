import { resolution, device } from "../context"
import "./FullScreen.scss";

export default class FullScreen {
    private element: HTMLElement;
    private isPortrait: boolean;

    constructor() {
        this.init();
        device.mobile.andriod &&
            "ontouchend" in document &&
            window.addEventListener("touchend", () => {
                this.onTouchFullScreen();
            });
        this.onStateChange();
        window.addEventListener("resize", () => {
            this.onStateChange();
        });
    }

    private init() {
        let scale = resolution.scale;
        let element: HTMLElement = this.element = document.createElement('div');
        element.className = "fullscreen";
        element.innerHTML = `
            <div class="container">
                <div class="icon-box" style="transform:scale(${scale}) translate(-50%,-50%)">
                </div>
            </div>`
            ;
        document.body.appendChild(element);
    }

    private onStateChange() {
        let isPortrait = resolution.isPortrait;
        let clientHeight = device.mobile.ios && (device.browser.chrome || device.browser.firefox) ? screen.width - 20 : document.documentElement.clientHeight;
        let hasNavBar = isPortrait ? window.innerHeight == clientHeight : window.innerHeight < clientHeight;
        this.element.style.visibility = (device.mobile.ios && !device.mobile.tablet) && hasNavBar && !isPortrait ? 'visible' : 'hidden';
        window.scrollTo(0, 0);
        if (this.isPortrait == isPortrait) return;
        device.mobile.ios && device.browser.safari && isPortrait && setTimeout(() => {
            document.querySelector('body').scrollTop = 0;
        }, 500);
        this.isPortrait = isPortrait;
    }

    private onTouchFullScreen() {
        let de = <any>document.documentElement;

        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    }
}