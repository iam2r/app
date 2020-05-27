import styles from "./styles.module.scss";
import Count from "app.root/components/Count";
import { Store } from "app.root/hooks";
import { useState } from "react";
import NoSleep from "app.root/nosleep";
const noSleep = new NoSleep();
const Home = (props: any) => {
  const { state } = Store();
  const [sleep, setSleep] = useState(true);

  const enable = () => {
    setSleep(false);
    noSleep.enable();
  };

  const disable = () => {
    setSleep(true);
    noSleep.disable();
  };

  return (
    <div className={styles.welcome}>
      <Count> </Count>
      <div>
        <button onClick={enable}>开启</button>
        <button onClick={disable}>关闭</button>
        <div>{!sleep ? "已开启常亮模式" : "会休眠"}</div>
      </div>
    </div>
  );
};

export default Home;
