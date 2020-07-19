import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "@/apps/test-react/router";
import { useCreateStore, Provider } from "@/apps/test-react/hooks";

const App = () => {
  const store = useCreateStore();
  return (
    <Provider value={store}>
      <HashRouter basename="/">
        <Switch>
          {routes.map(({ path, exact, component }, key) => (
            <Route key={key} path={path} exact={exact} component={component} />
          ))}
          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
