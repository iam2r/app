import styles from "./styles.module.scss";
import { connect } from "react-redux";
import actions from "../../store/actions";
const CountApp = (props) => {
  const { login, addThenMinus } = actions;
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Record: {props.record}</div>
      <div className={styles.current}>{props.current}</div>
      <p>{props.message}</p>
      <div className={styles.button}>
        <button
          onClick={() => {
            login({ username: "zrnokia5230", password: "zaq147895" });
          }}
        >
          login
        </button>
        <button
          onClick={() => {
            addThenMinus();
          }}
        >
          + then -
        </button>
      </div>
    </div>
  );
};

export default connect((state) => state)(CountApp);
