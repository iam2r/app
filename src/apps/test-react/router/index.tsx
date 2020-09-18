import { useState, useEffect } from "react";
const lazyLoad = ({
  component,
  loading,
}: {
  component: any;
  loading?: any;
}) => (props: any) => {
  const [state, setState] = useState({ component: null });
  useEffect(() => {
    (async () => {
      loading && setState({ component: loading });
      setState({ component: (await component()).default });
    })();
  }, [setState]);
  return state.component ? <state.component {...props} /> : null;
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
