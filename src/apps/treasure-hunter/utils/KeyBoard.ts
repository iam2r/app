export default class KeyBoard {
    constructor(keyCode: number | number[], press: Function, release?: Function) {
        this.keyCodes = typeof keyCode == 'number' ? [keyCode] : keyCode;
        this.press = press;
        this.release = release;
        this.initEvents()
    }
    public isDown: boolean = false;
    private keyCodes: number[];
    private press: Function;
    private release: Function;

    private initEvents(remove?: boolean) {
        let eventType = remove ? (el: any, type: string, fn: any, capture?: boolean) => {
            el.removeEventListener(type, fn, !!capture);
        } : (el: any, type: string, fn: any, capture?: boolean) => {
            el.addEventListener(type, fn, !!capture);
        },
            target = window;
        eventType(target, 'keydown', this);
        eventType(target, 'keyup', this);
    }

    private onKeyDown(e: KeyboardEvent) {
        if (this.isDown) return;
        if (this.keyCodes.includes(e.keyCode)) {
            this.isDown = !this.isDown;
            this.isDown && this.press && this.press()
        }
        e.preventDefault();
    }

    private onKeyUp(e: KeyboardEvent) {
        if (!this.isDown) return;
        if (this.keyCodes.includes(e.keyCode)) {
            this.isDown = !this.isDown;
            !this.isDown && this.release && this.release()
        }
        e.preventDefault();
    }

    protected handleEvent(e: KeyboardEvent) {
        switch (e.type) {
            case 'keydown':
                this.onKeyDown(e)
                break
            case 'keyup':
                this.onKeyUp(e)
                break
        }
    }

    public destroy() {
        this.initEvents(true)
    }
}