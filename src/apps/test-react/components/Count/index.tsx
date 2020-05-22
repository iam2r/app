import styles from "./styles.module.scss";
import actions from "app.root/hooks/actions";
import { Store } from "app.root/hooks";

const CountApp = (props) => {
  const { login, addThenMinus } = actions;
  const { state, dispatch } = Store();
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Record: {state.record}</div>
      <div className={styles.current}>{state.current}</div>
      <p>{state.message}</p>
      <div className={styles.button}>
        <button
          onClick={() => {
            login(dispatch, { username: "zrnokia5230", password: "zaq147895" });
          }}
        >
          login
        </button>
        <button
          onClick={() => {
            addThenMinus(dispatch);
          }}
        >
          + then -
        </button>
      </div>
    </div>
  );
};

export default CountApp;
