import { login } from "../services";
export interface Actions {
  addThenMinus: any;
  login: any;
}

export default {
  async addThenMinus(dispatch, payload?) {
    dispatch({
      type: "add",
    });

    await delay(1000);
    dispatch({
      type: "minus",
    });
  },
  async login(dispatch, payload?) {
    const res = await login(payload);
    dispatch({
      type: "loginStatus",
      data: res,
    });
  },
} as Actions;

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
