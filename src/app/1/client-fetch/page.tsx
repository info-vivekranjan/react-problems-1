"use client";

import { useEffect, useRef, useState } from "react";
import { UsersDataType, UsersApiResp } from "./clientFetchType";
import UserComp from "./UserCard";

export default function ClientFetch() {
  const [data, setData] = useState<UsersApiResp<UsersDataType> | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<UsersDataType[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const userRefData = useRef<Record<string, UsersDataType[]>>({});

  const fetchData = async () => {
    const cacheKey = `user-${skip}`;

    if (userRefData.current[cacheKey]) {
      setUsers(userRefData.current[cacheKey]);
      return;
    }
    setLoading(true);

    try {
      const resp = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );
      const result = await resp.json();

      console.log(result);

      setData(result);
      setUsers(result?.users);
      userRefData.current[cacheKey] = result?.users;
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSkip((prev) => prev - 10);
  };

  const handleNext = () => {
    setSkip((prev) => prev + 10);
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  console.log(userRefData.current);

  return (
    <>
      <h1>Client fetch with in-memory cache</h1>

      {loading ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {users.map((user) => {
              return <UserComp key={user.id} user={user} />;
            })}
          </div>
        </>
      )}

      <section
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <button onClick={handleBack} disabled={skip === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={data === undefined || data.total <= data.skip + data.limit}
        >
          Next
        </button>
      </section>
    </>
  );
}
