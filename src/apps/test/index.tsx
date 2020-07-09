import Vue from "vue";
import { directive } from "vue-awesome-swiper";
import { loadScripts } from "@/common/Utils";
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
const { JSEncrypt } = require("./_public/libs/hik/jsencrypt.min");
const { WebControl } = require("./_public/libs/hik/jsWebControl-1.0.0.min.js");

console.log(WebControl);

console.log(JSEncrypt);

const att = [];

loadScripts([
  { id: "jsencrypt", url: "./libs/hik/jsencrypt.min.js" },
  { id: "jsWebControl", url: "./libs/hik/jsWebControl-1.0.0.min.js" },
]).then(() => {});
