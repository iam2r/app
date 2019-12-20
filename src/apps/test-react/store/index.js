import { createStore, applyMiddleware } from "redux";
import defaultState from "./state";
import reducers from "./reducers";
import promise from "redux-promise";
export default createStore(
  (state = defaultState, action) =>
    reducers[action.type] ? reducers[action.type](state, action) : state,
  applyMiddleware(promise)
);
