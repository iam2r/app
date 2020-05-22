import styles from "./styles.module.scss";
import Count from "app.root/components/Count";
import { Store } from "app.root/hooks";
const Home = (props: any) => {
  const { state } = Store();

  return (
    <div className={styles.welcome}>
      <Count> </Count>
      {JSON.stringify(state)}
    </div>
  );
};

export default Home;
