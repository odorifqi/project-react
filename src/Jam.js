import { useState, useEffect } from "react";

export const Clock = ({ children }) => {
  const [time, setTime] = useState(new Date());

  const refreshTime = () => setTime(new Date());

  useEffect(() => {
    const runner = setInterval(refreshTime, 1000);
    return () => clearInterval(runner);
  }, []);

  const [count, setCount] = useState(
    parseInt(localStorage.getItem("count")) || 0
  );

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <div>
      <p>you clicked: {count} time</p>
      <button onClick={increment}>add</button>
      <button onClick={decrement}>min</button>
      <p>
        {children} <strong>{time.toLocaleTimeString()}</strong>
      </p>
    </div>
  );
};
