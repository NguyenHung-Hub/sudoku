import React, { useEffect } from "react";
import { formatTime } from "../../utils/time";

const Timer = ({ isActive, seconds, setSeconds }) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="my-2 flex w-28 items-center justify-center rounded-md bg-slate-600 px-2 py-1">
      <div className="select-none text-2xl tracking-wider text-gray-400">
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default Timer;
