export class PreLoader {
  private elPreLoad: HTMLElement;

  constructor() {
    this.init();
  }

  private init() {
    document.body.innerHTML += `
            <div class="pre-load">
                <div class="pre-logo"></div>
                <div class="pre-percent">
                    <b></b>
                </div>
            </div>`;

    this.elPreLoad = document.querySelector("body .pre-load");
  }

  public destory() {
    console.log(document.querySelector("body").contains(this.elPreLoad));
    document.querySelector("body").removeChild(this.elPreLoad);
  }
}

const loader = new PreLoader();

setTimeout(() => {
  loader.destory();
}, 5000);
