import { useReducer, useContext, createContext } from "react";
import defaultState, { State } from "./state";
import reducers from "./reducers";
import actions, { Actions } from "./actions";
interface Store {
  state: State;
  actions: Actions;
  dispatch: any;
}

const AppContext = createContext();
const Provider = AppContext.Provider;

const useStore = (): Store => useContext(AppContext);

const useCreateStore = (): Store => {
  const [state, dispatch] = useReducer(
    (state = defaultState, action) =>
      reducers[action.type] ? reducers[action.type](state, action) : state,
    defaultState
  );
  return {
    state,
    actions,
    dispatch,
  };
};

export { Provider, useStore, useCreateStore };
