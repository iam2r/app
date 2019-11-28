export default class Size {
    public width: number;
    public height: number;
    constructor(width: number = 0, height: number = 0) {
        this.width = width;
        this.height = height;
    }

    public get center() {
        return {
            x: this.width / 2,
            y: this.height / 2
        };
    }

    public get ratio() {
        return this.width / this.height;
    }
}