import { Component } from "react";
const lazyLoad = ({
  component,
  loading,
}: {
  component: Function;
  loading?: any;
}) =>
  class extends (Component as any) {
    private state: {
      c: any;
    };
    constructor() {
      super();
      this.state = {
        c: null,
      };
    }
    async componentDidMount() {
      loading && this.setState({ c: loading });
      const { default: c } = await component();
      this.setState({ c });
    }
    render() {
      const C = this.state.c;
      return C ? <C {...this.props} /> : null;
    }
  };

export default [
  {
    path: "/home",
    exact: true,
    component: lazyLoad({
      component: () => import(/* webpackChunkName: "Home" */ "../pages/Home"),
      loading: () => <div>Loading...</div>,
    }),
  },
  {
    path: "/home2",
    exact: true,
    component: lazyLoad({
      component: () => import(/* webpackChunkName: "Home2" */ "../pages/Home2"),
    }),
  },
];
