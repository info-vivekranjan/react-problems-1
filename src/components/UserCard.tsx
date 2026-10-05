"use client";

import { User } from "@/app/h-scroll/HscrollType";

export default function UserCard({ user }: { user: User }) {
  return (
    <section
      style={{
        border: "2px solid purple",
        borderRadius: "6px",
        width: "250px",
      }}
    >
      <div
        style={{
          height: "125px",
          backgroundColor: "purple",
          textAlign: "center",
        }}
      >
        <img
          src={user?.image}
          alt={user?.firstName}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "whitesmoke",
          }}
        />
      </div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <h3>{user?.id + "." + " " + user?.firstName + " " + user?.lastName}</h3>
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
        <br />
        <br />
        <a href={`tel:${user?.phone}`}>Phone: {user?.phone}</a>
        <p>Age: {user?.age}</p>
      </div>
    </section>
  );
}
