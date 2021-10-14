import { useState, useEffect } from "react";

export const SW = () => {
  const [mSec, setMSec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const start = () => setIsOn(true);
  const stop = () => setIsOn(false);
  const reset = () => {
    setIsOn(false);
    setMin(0);
    setSec(0);
    setMSec(0);
  };

  useEffect(() => {
    let ms;
    if (isOn) {
      ms = setInterval(() => setMSec((mSec) => mSec + 1), 10);
      if (sec === 59) {
        setSec(0);
        setMin((min) => min + 1);
      }
      if (mSec === 99) {
        setMSec(0);
        setSec((sec) => sec + 1);
      }
    }
    return () => {
      clearInterval(ms);
    };
  }, [mSec, sec, isOn]);

  return (
    <div>
      <p>
        {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}:
        {mSec.toString().padStart(2, "0")}
      </p>
      {!isOn && <button onClick={start}>{!mSec ? "start" : "resume"}</button>}
      {isOn && <button onClick={stop}>stop</button>}
      <button disabled={!mSec} onClick={reset}>
        reset
      </button>
    </div>
  );
};
