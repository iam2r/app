import Vue, { VNode } from "vue";
import "vue-tsx-support/enable-check";
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = Vue;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "vue-tsx-support/types/base" {
  interface ComponentAdditionalAttrs {
    [name: string]: any;
  }
}
