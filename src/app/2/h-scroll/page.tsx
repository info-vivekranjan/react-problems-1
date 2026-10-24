"use client";

import { useEffect, useRef, useState } from "react";
import { HscrollFetchUserDataType } from "./HscrollType";
import HscrollCardComp from "./HscrollCardComp";

export default function HScroll() {
  const [usersData, setUsersData] = useState<HscrollFetchUserDataType[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);
  const raceConditionRef = useRef(0);
  const fetchMoreDataRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    const id = ++raceConditionRef.current;

    try {
      setIsLoading(true);
      const resp = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      const result = await resp.json();

      if (id === raceConditionRef.current) {
        console.log(result);
        setUsersData((prev) => [...prev, ...result?.users]);

        if (result.limit + result.skip >= result.total) {
          setHasMore(false);
        }
      }
    } catch (error) {
      if (id === raceConditionRef.current) {
        setIsLoading(false);
        console.error(error);
      }
    } finally {
      if (id === raceConditionRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  useEffect(() => {
    const ele = fetchMoreDataRef.current;

    if (!ele) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) {
        setSkip((prev) => prev + 10);
      }
    });

    if (ele) {
      observer.observe(ele);
    }

    return () => {
      if (ele) {
        observer.unobserve(ele);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <>
      <h1>Horizontal Scroll</h1>
      <div
        style={{
          border: "2px solid red",
          overflowX: "auto",
          display: "flex",
          gap: "15px",
        }}
      >
        {usersData.map((user) => {
          return <HscrollCardComp key={user.id} user={user} />;
        })}
        <div style={{ border: "1px solid black" }} ref={fetchMoreDataRef}>
          {isLoading ? "Loading..." : "Load"}
        </div>
      </div>
    </>
  );
}
