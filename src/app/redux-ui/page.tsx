"use client";

import {
  decrement,
  increment,
  incrementByValue,
  fetchUsers,
} from "@/lib/features/counter/CounterSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

export default function Home() {
  const count = useAppSelector((state) => state.counter.count);
  const { data, loading, error } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <h1>Counter with Redux</h1>
      <h1>Count : {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrementt</button>
      <button onClick={() => dispatch(incrementByValue(5))}>
        Increment By 5
      </button>
      <h2>===========================</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {" "}
          {data?.map((item: { id: number; name: string }) => {
            return (
              <div key={item.id}>
                <p>{item.name}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
