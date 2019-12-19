export default {
  add(state, { data }) {
    const newCurrent = state.current + 1;
    return {
      ...state,
      record: newCurrent > state.record ? newCurrent : state.record,
      current: newCurrent
    };
  },
  minus(state, { data }) {
    return {
      ...state,
      current: state.current - 1
    };
  },
  loginStatus(state, { data }) {
    return {
      ...state,
      isLogined: !state.isLogined,
      current: Object.keys(data).length,
      message: data.message
    };
  }
};
