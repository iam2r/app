import { connect } from "react-redux";
import styles from "./styles.module.scss";
import Count from "../../components/Count";
import AppStore from "app.root/hooks";
const Home = (props: any) => {
  const [state, dispath] = AppStore();

  return (
    <div className={styles.welcome}>
      <Count> </Count>
      {state.current}
    </div>
  );
};

export default connect((state) => state)(Home);
