"use client";

import { useEffect, useRef, useState } from "react";
import UserCardComp from "./UserCardComp";
import {
  ClientFetchUserApiType,
  ClientFetchUserDataType,
} from "./ClientFetchType";

export default function ClientFech() {
  const [userData, setUserData] = useState<ClientFetchUserDataType[]>([]);
  const [userObj, setUserObj] = useState<
    ClientFetchUserApiType<ClientFetchUserDataType>
  >({} as ClientFetchUserApiType<ClientFetchUserDataType>);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [isLoading, setIsLoading] = useState(false);
  const userDataRef = useRef<Record<string, ClientFetchUserDataType[]>>({});

  const fetchData = async () => {
    const cacheKey = `cache-user-${skip}`;

    if (userDataRef.current[cacheKey]) {
      setUserData(userDataRef.current[cacheKey]);
      return;
    }

    setIsLoading(true);
    try {
      const resp = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );

      const result = await resp.json();

      console.log(result);
      setUserData(result?.users);
      setUserObj(result);

      userDataRef.current[cacheKey] = result?.users;
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setSkip((prev) => prev + 10);
  };

  const handleBack = () => {
    setSkip((prev) => prev - 10);
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <>
      <h1>Client Fetch</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {userData?.map((user) => {
            return <UserCardComp key={user.id} user={user} />;
          })}
        </>
      )}

      <section
        style={{ display: "flex", justifyContent: "center", gap: "15px" }}
      >
        <button disabled={skip === 0} onClick={handleBack}>
          Back
        </button>
        <button
          disabled={userObj?.skip + userObj?.limit >= userObj?.total}
          onClick={handleNext}
        >
          Next
        </button>
      </section>
    </>
  );
}
