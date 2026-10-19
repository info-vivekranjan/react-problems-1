"use client";

import { useEffect, useRef, useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStartTimer = () => {
    if (timerRef.current !== null) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const handlePauseTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStopTimer = () => {
    handlePauseTimer();
    setCount(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1>Timer</h1>
      <h1>{count}</h1>
      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handlePauseTimer}>Pause</button>
      <button onClick={handleStopTimer}>Stop</button>
    </>
  );
}
