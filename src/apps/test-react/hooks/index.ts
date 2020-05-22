import { useReducer, useContext, createContext } from "react";
import defaultState, { State } from "./state";
import reducers from "./reducers";

const AppContext = createContext();
const Provider = AppContext.Provider;

const Store = (): { state: State; dispatch: any } => useContext(AppContext);

const useAppReducer = (): [State, any] =>
  useReducer(
    (state = defaultState, action) =>
      reducers[action.type] ? reducers[action.type](state, action) : state,
    defaultState
  );

export { Provider, Store, useAppReducer };
