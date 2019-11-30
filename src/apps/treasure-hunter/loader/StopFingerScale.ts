export default class StopFingerScale {
    constructor(el?: HTMLElement) {
        this.el = el ? el : document.querySelector('body');
        this.initEvents();
    }
    private el: HTMLElement;

    private preventDefaultException: { [key: string]: RegExp } = {
        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
    }

    private initiated: boolean = false;

    private checkPreventDefault(el: EventTarget, exceptions: { [key: string]: RegExp }) {
        for (let i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }
        return false;
    }

    private onStart(e: TouchEvent) {
        if (e.touches.length > 1) {//touch events are not dispatched during ios momentum scrolling. The following code works as long as the page is not scrolling
            e.preventDefault();
        }
        if (this.initiated) return;

        if (!this.checkPreventDefault(e.target, this.preventDefaultException)) {
            e.preventDefault();
        }
        this.initiated = true;

    }

    private onMove(e: TouchEvent) {
        if (!this.initiated)
            return;
        e.preventDefault();
    }

    private onEnd(e: TouchEvent) {
        if (!this.initiated) return;
        if (!this.checkPreventDefault(e.target, this.preventDefaultException)) {
            e.preventDefault();
        }
    }

    private initEvents(remove?: boolean) {
        let eventType = remove ? (el: any, type: string, fn: any, options?: any) => {
            el.removeEventListener(type, fn, options);
        } : (el: any, type: string, fn: any, options?: any) => {
            el.addEventListener(type, fn, options);
        },
            target = this.el;
        if ('ontouchstart' in window) {
            eventType(target, 'touchstart', this, { passive: false });
            eventType(target, 'touchmove', this);
            eventType(target, 'touchcancel', this);
            eventType(target, 'touchend', this);
        }

    }

    protected handleEvent(e: TouchEvent) {
        switch (e.type) {
            case 'touchstart':
                this.onStart(e);
                break;
            case 'touchmove':
                this.onMove(e);
                break;
            case 'touchend':
            case 'touchcancel':
                this.onEnd(e);
                break;
        }
    }

}