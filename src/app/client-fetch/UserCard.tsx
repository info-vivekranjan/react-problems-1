"use client";

import { UsersDataType } from "./clientFetchType";

export default function UserComp({ user }: { user: UsersDataType }) {
  return (
    <section style={{ border: "2px solid orange", padding: "15px" }}>
      <h3 style={{ marginTop: "0" }}>
        {user.id} - {`Name: ${user?.firstName} ${user?.lastName}`}
      </h3>
      <h3>{`Age: ${user?.age}`}</h3>
      <h3>{`Gender: ${user?.gender}`}</h3>
      <a href={`mailto:${user.email}`}>Email: {user.email}</a>
      <br />
      <br />
      <a href={`tel:${user.phone}`}>Phone: ${user.phone}</a>
    </section>
  );
}
