import { useState, useEffect } from "react";
const asyncComponent = (importComponent: Function) => {
  return (props: any): any => {
    const [component, setComponent] = useState(null);
    useEffect(() => {
      importComponent().then(({ default: component }) => {
        setComponent(component);
      });
    }, []);
    const C = component;
    return C ? <C {...props} /> : null;
  };
};

export default [
  {
    path: "/home",
    exact: true,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "Home" */ "../pages/Home")
    ),
  },

  {
    path: "/hookstest",
    exact: true,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "HooksTest" */ "../pages/HooksTest")
    ),
  },
];
