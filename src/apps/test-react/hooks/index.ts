import defaultState from "./state";
import reducers from "./reducers";
import { useReducer } from "react";

const [state, dispatch] = useReducer(
  (state = defaultState, action) =>
    reducers[action.type] ? reducers[action.type](state, action) : state,
  defaultState
);

export { state, dispatch };
