import React, { useEffect } from "react";
import "./styles.css";

const Time = ({ time }) => <h3>{time}</h3>;
const useTimeHook = (delay) => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef();
  const startTimer = () => {
    setTime(delay);
    const timeInterval = setInterval(() => {
      setTime((time) => time - 1);
      if (timerRef.current === 1) {
        clearInterval(timeInterval);
      }
    }, 1000);
  };

  useEffect(() => {
    timerRef.current = time;
  }, [time]);
  return [time, startTimer];
};

const useHoverHook = (ref) => {
  const [hover, setHover] = React.useState();

  const hoverInside = () => {
    setHover(true);
  };

  const hoverOutside = () => {
    setHover(false);
  };

  useEffect(() => {
    ref.current.addEventListener("mouseleave", hoverOutside);
    ref.current.addEventListener("mouseover", hoverInside);
    return () => {
      ref.current.removeEventListener("mouseleave", hoverOutside);
      ref.current.removeEventListener("mouseover", hoverInside);
    };
  }, []);

  return [hover];
};

export default function App() {
  const [time, startTimer] = useTimeHook(5);
  const ref = React.useRef();
  const [hover] = useHoverHook(ref);

  // React.useEffect(() => {
  //   ref.current.style.backgroundColor = `${hover ? "red" : "pink"}`;
  // }, [hover]);

  return (
    <div className="App">
      {time > 0 && <Time time={time} />}
      <button onClick={startTimer} disabled={time > 0}>
        Start Timer
      </button>
      <div>{`${hover}`}</div>
      <div ref={ref} className="panel"></div>
    </div>
  );
}
