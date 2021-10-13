import { useState, useEffect } from "react";

export const Clock = ({ children }) => {
  const [time, setTime] = useState(new Date());

  const refreshTime = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const runner = setInterval(refreshTime, 1000);
    return () => {
      clearInterval(runner);
    };
  }, []);

  return (
    <div>
      <p>
        {children} <strong>{time.toLocaleTimeString()}</strong>
      </p>
    </div>
  );
};
