"use client";

import React, { useState } from "react";
import { DIRECTION_ENUM, KanbanTaskType, STATUS_ENUM } from "./KanbanBoardType";

export default React.memo(function KanbanTask({
  task,
  handleChangeStatus,
  handleDeleteTask,
  handleEditTask,
}: {
  task: KanbanTaskType;
  handleChangeStatus: (
    id: number,
    status: STATUS_ENUM,
    direction: DIRECTION_ENUM,
  ) => void;
  handleDeleteTask: (id: number) => void;
  handleEditTask: (id: number, title: string) => void;
}) {
  const [isEditTask, setIsEditTask] = useState(false);
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);

  const handleChangeEditTaskTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditTaskTitle(e.target.value);
  };

  const handleSaveEditTask = () => {
    handleEditTask(task.id, editTaskTitle);
    setIsEditTask(false);
  };

  return (
    <section
      style={{
        border: "1px solid orange",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          {isEditTask ? (
            <div>
              <input
                type="text"
                name="title"
                value={editTaskTitle}
                onChange={handleChangeEditTaskTitle}
              />
              <button onClick={handleSaveEditTask}>Save</button>
            </div>
          ) : (
            <h3 style={{ marginTop: 0 }}>Title: {task.title}</h3>
          )}

          <p>Date: {task.date}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setIsEditTask(true)}>✏️</button>
          <button onClick={() => handleDeleteTask(task.id)}>❌</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {task.status !== STATUS_ENUM.TO_DO && (
          <button
            onClick={() =>
              handleChangeStatus(task.id, task.status, DIRECTION_ENUM.BACKWARD)
            }
          >
            ⬅️
          </button>
        )}
        <div></div>
        {task.status !== STATUS_ENUM.DONE && (
          <button
            onClick={() =>
              handleChangeStatus(task.id, task.status, DIRECTION_ENUM.FORWARD)
            }
          >
            ➡️
          </button>
        )}
      </div>
    </section>
  );
});
