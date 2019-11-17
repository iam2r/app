import { render } from "react-dom";
import { Provider } from "react-redux";
import App from './router';
import store from './store';
render(
    <Provider store={store}>
       <App />
    </Provider>,
    document.getElementById("app")
)