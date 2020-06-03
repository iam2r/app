export interface LandInAnimationOptions {
  splitSymbol?: string;
  content: string;
}
export default class LandInAnimation {
  private $el: HTMLElement;
  private splitSymbol: string = "<br>";
  private text: string;
  private items: HTMLElement[] = [];
  constructor(el: string | HTMLElement, options: LandInAnimationOptions) {
    this.$el = typeof el == "string" ? document.querySelector(el) : el;
    options.splitSymbol && (this.splitSymbol = options.splitSymbol);
    this.text = options.content;
    this.init();
  }

  private init() {
    let count = 0;

    this.text
      .trim()
      .split(this.splitSymbol)
      .forEach((p) => {
        const letters = p.split("");
        letters.forEach((letter) => {
          const span = document.createElement("span");
          span.textContent = letter;
          span.classList.add("land-in-animation");
          span.style.animationDelay = `${count * 0.05}s`;
          this.items.push(span);
          count++;
        });
        this.items.push(document.createElement("br"));
      });
  }

  public start() {
    this.hide();
    this.items.forEach((item: HTMLElement) => {
      item.nodeName != "BR" && item.classList.add("land-in-animation");
      this.$el.appendChild(item);
    });
  }

  public hide() {
    this.$el.innerHTML = "";
  }

  public skip() {
    this.items.forEach((item: HTMLElement) => {
      item.classList.remove("land-in-animation");
    });
  }

  public destory() {
    this.$el = null;
    this.items = [];
  }
}
