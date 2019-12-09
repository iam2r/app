import { resolution, device } from "../context"
import "./FullScreen.scss";

export default class FullScreen {
    private element: HTMLElement;
    private preventTouchEvent: boolean = true;
    constructor() {
        this.init();
        this.onStateChange();
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
        this.element.style.visibility = 'hidden';
        document.body.appendChild(element);
    }

    private onStateChange() {
        let isPortrait = resolution.isPortrait;
        if (device.mobile.ios && !device.mobile.tablet && device.browser.safari) {
            let clientHeight = document.documentElement.clientHeight;
            let hasNavBar = isPortrait ? window.innerHeight == clientHeight : window.innerHeight < clientHeight;
            let showFullScreen = (device.mobile.ios && !device.mobile.tablet) && hasNavBar;
            this.element.style.visibility = showFullScreen ? 'visible' : 'hidden';
            document.body.style.overflow = showFullScreen ? 'auto' : 'hidden';
            this.preventTouchEvent = !showFullScreen;
            window.scrollTo(0, 0);
        }
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

    private onPreventTouch(e: TouchEvent) {
        if (this.preventTouchEvent || e.touches.length > 1) {
            e.preventDefault();
        }
    }

    private initEvents(remove?: boolean) {
        let eventType = remove ? (el: any, type: string, fn: any, options?: any) => {
            el.removeEventListener(type, fn, options);
        } : (el: any, type: string, fn: any, options?: any) => {
            el.addEventListener(type, fn, options);
        };

        eventType(window, 'touchstart', this, { passive: false });
        eventType(window, "touchend", this);
        eventType(window, 'touchcancel', this);


        eventType(window, "resize", this);
        eventType(window, "orientationchange", this);
    }

    protected handleEvent(e: Event | TouchEvent) {
        switch (e.type) {
            case 'touchstart':
                this.onPreventTouch(e as TouchEvent);
                break;
            case 'touchend':
            case 'touchcancel':
                if (device.mobile.andriod) {
                    this.onTouchFullScreen()
                }
                if (device.mobile.ios && this.preventTouchEvent) {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    })
                }
                break;
            case 'resize':
            case 'orientationchange':
                this.onStateChange();
                break
        }
    }
}