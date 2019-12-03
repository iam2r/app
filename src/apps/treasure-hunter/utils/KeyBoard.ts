export default class KeyBoard {
    constructor(keyCode: number, press: Function, release?: Function) {
        this.keyCode = keyCode;
        this.press = press;
        this.release = release;
        this.initEvents()
    }
    public isDown: boolean = false;
    private keyCode: number;
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
        if (e.keyCode == this.keyCode) {
            if (!this.isDown) {
                this.press && this.press()
            }
            this.isDown = true;
        }
        e.preventDefault();
    }

    private onKeyUp(e: KeyboardEvent) {
        if (e.keyCode == this.keyCode) {
            if (this.isDown) {
                this.release && this.release()
            }
            this.isDown = false;
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