import { Component } from "react";
const asyncComponent = importComponent => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        component: null
      };
    }
    async componentDidMount() {
      this.setState({ component: (await importComponent()).default });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default [
  {
    path: "/home",
    exact: true,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "Home" */ "../pages/Home")
    )
  },
  {
    path: "/about",
    exact: true,
    component: asyncComponent(() =>
      import(/* webpackChunkName: "About" */ "../pages/About")
    )
  }
];
