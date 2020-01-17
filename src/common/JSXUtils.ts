export default class JSXUtils {
  static h(type: string, props: { [key: string]: any } | string, children) {
    if (Array.isArray(props) || typeof props === "string") {
      children = props;
      props = {};
    }
    props.children = children ? [].concat.apply([], children) : [];

    return {
      type,
      props
    };
  }

  static createElement(vdom: any): HTMLElement | Text {
    if (typeof vdom === "string") {
      return document.createTextNode(vdom);
    }

    let {
      type,
      props,
      props: { children }
    } = vdom;

    const element = document.createElement(type);
    JSXUtils.setProps(element, props);
    children = children || [];
    children = children instanceof Array ? children : [children];
    children
      .map(JSXUtils.createElement)
      .forEach(element.appendChild.bind(element));
    return element;
  }

  static setProps(element: HTMLElement, props: { [key: string]: any }) {
    for (let key in props) {
      if (key == "children") continue;
      const value = props[key];
      if (typeof value === "object") {
        switch (key) {
          case "style":
            let cssText = "";
            for (let prop in value) {
              const style = value[prop];
              cssText += `${prop}:${style};`;
            }
            element.setAttribute(key, cssText);
            break;
          default:
            JSXUtils.setProps(element, value);
            break;
        }
      } else {
        element.setAttribute(key, value);
      }
    }
  }
}
