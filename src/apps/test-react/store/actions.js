import store from "./index";
import { login } from "../services";
const { dispatch } = store;
export default {
  async addThenMinus(payload) {
    dispatch({
      type: "add"
    });

    await delay(1000);
    dispatch({
      type: "minus"
    });
  },
  async login(payload) {
    const res = await login(payload);
    dispatch({
      type: "loginStatus",
      data: res
    });
  }
};

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
