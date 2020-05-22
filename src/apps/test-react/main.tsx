import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "app.root/router";
import { useAppReducer, Provider } from "app.root/hooks";

const App = () => {
  const [state, dispatch] = useAppReducer();
  return (
    <Provider value={{ state, dispatch }}>
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
