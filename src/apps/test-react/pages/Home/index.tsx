import styles from "./styles.module.scss";
import Count from "@/apps/test-react/components/Count";
import VideoObject from "@/apps/test-react/components/VideoObject";
import { useStore } from "@/apps/test-react/hooks";
import { useState, useMemo, useRef, useEffect } from "react";
import NoSleep from "@/apps/test-react/nosleep";
const noSleep = new NoSleep();
const Home = (props: any) => {
  const { state } = useStore();
  const [sleep, setSleep] = useState(true);
  const memoizedValue = useMemo(() => state.current + 1, [state.current]);
  const el = useRef(null);

  useEffect(() => {
    console.log(el.current);

    return;
  });

  const enable = () => {
    setSleep(false);
    noSleep.enable();
  };

  const disable = () => {
    setSleep(true);
    noSleep.disable();
  };

  return (
    <div className={styles.welcome} ref={el}>
      {/* <Count> </Count> */}
      <VideoObject />
      <div>
        <button onClick={enable}>开启</button>
        <button onClick={disable}>关闭</button>
        {JSON.stringify(state)}
        {memoizedValue}
        <div>{!sleep ? "已开启常亮模式" : "会休眠"}</div>
      </div>
    </div>
  );
};

export default Home;
