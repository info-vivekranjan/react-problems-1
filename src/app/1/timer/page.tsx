"use client";

import { useRef, useState } from "react";

export default function Timer() {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    if (counterRef.current !== null) {
      return;
    }
    counterRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    setCounter(0);
    if (counterRef.current !== null) {
      clearInterval(counterRef.current);
    }
    counterRef.current = null;
  };

  const handlePause = () => {
    if (counterRef.current !== null) {
      clearInterval(counterRef.current);
    }
    counterRef.current = null;
  };

  return (
    <>
      <h1>Timer</h1>
      <h1>Counter : {counter}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
