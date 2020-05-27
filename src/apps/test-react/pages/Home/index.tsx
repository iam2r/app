import styles from "./styles.module.scss";
import Count from "app.root/components/Count";
import { Store } from "app.root/hooks";
import { useState } from "react";
import NoSleep from "app.root/nosleep";
const noSleep1 = new NoSleep();
const Home = (props: any) => {
  const { state } = Store();
  const [noSleep, setNoSleep] = useState(false);
  let noSleepTimer: any = -1;
  const enable = () => {
    setNoSleep(true);
    noSleep1.enable();
  };

  const disable = () => {
    setNoSleep(false);
    noSleep1.disable();
  };

  return (
    <div className={styles.welcome}>
      <Count> </Count>
      <div>
        <button onClick={enable}>开启</button>
        <button onClick={disable}>关闭</button>
        <div>{noSleep ? "已开启常亮模式" : "会休眠"}</div>
      </div>
    </div>
  );
};

export default Home;
