"use client";

import { VscrollFetchUserDataType } from "./VscrollType";

export default function VscrollCardComp({
  user,
}: {
  user: VscrollFetchUserDataType;
}) {
  return (
    <section
      style={{
        border: "2px solid blue",
        padding: "5px",
        margin: "10px",
        borderRadius: "12px",
      }}
    >
      <div>
        <img
          src={user?.image}
          alt={`${user?.firstName}-profile`}
          style={{ border: "1px solid red", borderRadius: "12px" }}
        />
      </div>
      <h3>ID: {`${user?.id}`}</h3>

      <h3>Name: {`${user?.firstName} ${user?.lastName}`}</h3>
      <h3>Age: {user?.age}</h3>
      <h3>{user?.gender}</h3>
      <div>
        <span>Email: </span>
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
      </div>
      <br />
      <div>
        <span>Phone: </span>
        <a href={`tel:${user?.phone}`}>{user?.phone}</a>
      </div>
    </section>
  );
}
