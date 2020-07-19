import styles from "./styles.module.scss";
import Count from "@/apps/test-react/components/Count";
import { useStore } from "@/apps/test-react/hooks";
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
