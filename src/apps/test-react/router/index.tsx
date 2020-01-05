import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import routesConfig from "./routesConfig";
const App = () => {
  return (
    <Router basename="/">
      <Switch>
        {routesConfig.map(({ path, exact, component }, key) => (
          <Route key={key} path={path} exact={exact} component={component} />
        ))}
        <Route render={() => <Redirect to="/home" />} />
      </Switch>
    </Router>
  );
};

export default App;
