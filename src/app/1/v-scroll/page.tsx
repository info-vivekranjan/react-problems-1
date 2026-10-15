"use client";

import UserCard from "@/components/UserCard";
import { useEffect, useRef, useState } from "react";
import { User } from "../h-scroll/HscrollType";

export default function Vscroll() {
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
        if (result?.users % 10 === 0) {
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
      <h1>Vertical Scroll</h1>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {userData?.map((user) => {
          return <UserCard key={user?.id} user={user} />;
        })}
      </div>
      {hasMore && (
        <div ref={observRef} style={{ textAlign: "center", padding: "10px" }}>
          {loading ? "Loading..." : "Load"}
        </div>
      )}

      {!hasMore && (
        <div style={{ textAlign: "center", padding: "10px", color: "red" }}>
          No more users
        </div>
      )}
    </>
  );
}
