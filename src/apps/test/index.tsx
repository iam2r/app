import { loadScripts } from "@/common/Utils";
import JSXUtils from "@/common/JSXUtils";

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

export class Child extends PreLoader {}

const inherit = (subType, surperType) => {
  const prototype = Object.create(surperType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
  subType.__proto__ = surperType;
};

function SurperType() {}
SurperType.prototype.eat = function () {};

function SubType() {}

inherit(SubType, SurperType);

const att = [];

loadScripts([
  { id: "jsencrypt", url: "./libs/hik/jsencrypt.min.js" },
  { id: "jsWebControl", url: "./libs/hik/jsWebControl-1.0.0.min.js" },
]).then(() => {});

const render = (h) => (
  <div>
    <div id="ocxContainer" style="width:100%;height:70%">
      <object
        classid="clsid:BE020CC9-521F-4641-85E1-3B631B7ADDD9"
        id="preview"
        width="800"
        height="500"
        name="preview"
      >
        <param name="Ip" value="10.33.27.144" />
        <param name="UserName " value="admin" />
        <param name="PrivilegeCode" value="0401,0402," />
      </object>
    </div>
    <script
      language="javascript"
      for="preview"
      event="MsgNotify(iMsg,iError,szDetail,lWnd,szIndexCode)"
      src="./msgNotify.js"
    >
      {" "}
    </script>
  </div>
);

const $html = JSXUtils.createElement(render(JSXUtils.h));
document.querySelector("#app").appendChild($html);
