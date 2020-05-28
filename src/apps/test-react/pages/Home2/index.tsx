import styles from "./styles.module.scss";
import Count from "app.root/components/Count";
import { useStore } from "app.root/hooks";
const Home = (props: any) => {
  const { state } = useStore();

  return (
    <div className={styles.welcome}>
      <Count> </Count>
      {JSON.stringify(state)}
    </div>
  );
};

export default Home;
