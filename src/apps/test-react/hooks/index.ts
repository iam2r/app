import defaultState, { State } from "./state";
import reducers from "./reducers";
import { useReducer } from "react";

export default (): [State, any] => {
  const [state, dispatch] = useReducer(
    (state = defaultState, action) =>
      reducers[action.type] ? reducers[action.type](state, action) : state,
    defaultState
  );
  return [state, dispatch];
};
