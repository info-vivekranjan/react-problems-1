"use client";

import { useEffect, useRef, useState } from "react";
import { VscrollFetchUserDataType } from "./VscrollType";
import VscrollCardComp from "./VscrollCardComp";

export default function VScroll() {
  const [userData, setUserData] = useState<VscrollFetchUserDataType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const apiFetchRef = useRef(0);
  const loadRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    const id = ++apiFetchRef.current;

    setIsLoading(true);
    try {
      const resp = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      const result = await resp.json();

      if (id === apiFetchRef.current) {
        console.log(result);
        setUserData((prev) => [...prev, ...result?.users]);

        if (result?.total <= result?.skip + result?.limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      if (id === apiFetchRef.current) {
        console.error(error);
      }
    } finally {
      if (id === apiFetchRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  useEffect(() => {
    const ele = loadRef?.current;

    if (!ele) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          setSkip((prev) => prev + 10);
        }
      },
      { threshold: 0.5 },
    );

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
      <h1>Vertical Scroll</h1>
      {userData?.map((user) => {
        return <VscrollCardComp key={user.id} user={user} />;
      })}

      {hasMore && (
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            textAlign: "center",
          }}
          ref={loadRef}
        >
          {isLoading ? "Loading..." : "Load More"}
        </div>
      )}

      {!hasMore && (
        <div
          style={{
            padding: "10px",
            border: "1px solid black",
            textAlign: "center",
          }}
          ref={loadRef}
        >
          No More Data
        </div>
      )}
    </>
  );
}
