"use client";

import { useEffect, useState } from "react";
import UserCardComp from "./UserCardComp";
import { ClientFetchUserDataType } from "./ClientFetchType";

export default function ClientFech() {
  const [userData, setUserData] = useState<ClientFetchUserDataType[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const fetchData = async () => {
    const resp = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    );

    const result = await resp.json();

    console.log(result);
    setUserData(result?.users);
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
      {userData?.map((user) => {
        return <UserCardComp key={user.id} user={user} />;
      })}
      <section
        style={{ display: "flex", justifyContent: "center", gap: "15px" }}
      >
        <button disabled={skip === 0} onClick={handleBack}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </section>
    </>
  );
}
