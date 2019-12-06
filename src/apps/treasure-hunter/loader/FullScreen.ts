import { resolution, device } from "../context"
import "./FullScreen.scss";

export default class FullScreen {
    private element: HTMLElement;
    private isPortrait: boolean;
    private initiated: boolean = false;
    constructor() {
        this.init();
        this.initEvents();
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
        let showFullScreen = (device.mobile.ios && !device.mobile.tablet) && hasNavBar && !isPortrait;
        this.element.style.display = showFullScreen ? '' : 'none';
        this.initiated = showFullScreen;
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

    private onStart(e: TouchEvent) {
        if (!this.initiated || e.touches.length > 1) {
            e.preventDefault();
        }
    }

    private initEvents(remove?: boolean) {
        let eventType = remove ? (el: any, type: string, fn: any, options?: any) => {
            el.removeEventListener(type, fn, options);
        } : (el: any, type: string, fn: any, options?: any) => {
            el.addEventListener(type, fn, options);
        };

        if (device.mobile.andriod) {
            eventType(window, "touchend", this);
            eventType(window, 'touchcancel', this);
        }

        if (device.mobile.ios) {
            let target = document.querySelector('body');
            eventType(target, 'touchstart', this, { passive: false });
        }

        this.onStateChange();
        eventType(window, "resize", this);
        eventType(window, "orientationchange", this);

    }

    protected handleEvent(e: Event) {
        switch (e.type) {
            case 'touchstart':
                this.onStart(e as TouchEvent);
                break;
            case 'touchend':
            case 'touchcancel':
                if (device.mobile.andriod) {
                    this.onTouchFullScreen()
                }
                break;
            case 'resize':
            case 'orientationchange':
                this.onStateChange();
                break
        }
    }
}