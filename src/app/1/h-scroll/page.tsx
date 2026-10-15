"use client";

import { useEffect, useRef, useState } from "react";
import UserCard from "@/components/UserCard";
import { User } from "./HscrollType";

export default function Hscroll() {
  // https://dummyjson.com/users?limit=10&skip=0
  const [userData, setUserData] = useState<User[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchUserRef = useRef(0);
  const observRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsersData = async () => {
    if (loading || !hasMore) {
      return;
    }

    const id = ++fetchUserRef.current;
    setLoading(true);
    try {
      const resp = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`,
      );
      const result = await resp.json();

      console.log(result);
      if (id === fetchUserRef.current) {
        setUserData((prev) => [...prev, ...result?.users]);

        if (result?.users?.length % 10 !== 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      if (id === fetchUserRef.current) {
        console.error(error);
      }
    } finally {
      if (id === fetchUserRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [skip]);

  useEffect(() => {
    const ele = observRef.current;
    if (ele === null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore) {
        setSkip((prev) => prev + 10);
      }
    });

    if (observer) {
      observer.observe(ele);
    }

    return () => {
      if (observer) {
        observer.unobserve(ele);
      }
    };
  }, [loading, hasMore]);

  return (
    <>
      <h1>Horizontal Scroll</h1>
      <div
        style={{
          border: "1px solid red",
          overflowX: "auto",
          display: "flex",
          gap: "20px",
          padding: "10px",
        }}
      >
        {userData?.map((user) => {
          return <UserCard key={user?.id} user={user} />;
        })}

        {hasMore && (
          <div ref={observRef}>{loading ? "Loading..." : "Load"}</div>
        )}
        {!hasMore && <p>No More Users</p>}
      </div>
    </>
  );
}
