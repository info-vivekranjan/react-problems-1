"use client";

import React, { useState } from "react";
import { KanbanDataType, STATUA_TYPES } from "./kanbanType";

export default function KanbanBoard() {
  const [formInput, setFormInput] = useState({
    title: "",
    date: "",
  });
  const [task, setTask] = useState<KanbanDataType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Submitting...");

    const payload: KanbanDataType = {
      id: Date.now(),
      title: formInput.title,
      date: formInput.date,
      status: STATUA_TYPES.TODO,
    };

    setTask((prev) => [...prev, payload]);
    setFormInput({ title: "", date: "" });
  };

  console.log(task);

  return (
    <>
      <h1>Kanban Board</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            <div style={{ fontSize: "20px", fontWeight: "600" }}>Title</div>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formInput.title}
            onChange={handleChange}
            style={{ padding: "10px", width: "300px", fontSize: "25px" }}
          />
        </div>
        <div>
          <label htmlFor="date">
            <div
              style={{ fontSize: "20px", fontWeight: "600", marginTop: "15px" }}
            >
              Date
            </div>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formInput.date}
            onChange={handleChange}
            style={{ padding: "10px", width: "300px", fontSize: "25px" }}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            style={{
              marginTop: "15px",
              padding: "10px",
              width: "150px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          />
        </div>
      </form>
      <hr />
      <h2>Tasks</h2>
    </>
  );
}
