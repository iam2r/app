import request from "../utils/request";

export const login = (payload) => {
  return request("/testlocal/user/login", {
    type: "post",
    payload,
  });
};
