import React, { useState } from "react";
import { KanbanDataType, STATUA_TYPES, TASK_DIRECTION } from "./kanbanType";

export default function TaskComp({
  taskItem,
  handleChnageStatus,
  handleDeleteTask,
  handleEditTask,
}: {
  taskItem: KanbanDataType;
  handleChnageStatus: (
    id: number,
    status: STATUA_TYPES,
    direction: TASK_DIRECTION,
  ) => void;
  handleDeleteTask: (id: number) => void;
  handleEditTask: (id: number, title: string) => void;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(taskItem.title);

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleEditSubmit = () => {
    if (editTitle.trim() === "") {
      return;
    }
    handleEditTask(taskItem.id, editTitle);
    setShowEdit(false);
  };

  return (
    <section
      style={{
        border: "1px solid orange",
        borderRadius: "4px",
        padding: "10px",
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
          {showEdit ? (
            <div>
              {" "}
              <input
                placeholder="Edit Title"
                onChange={handleChangeEdit}
                value={editTitle}
                name="title"
              />
              <button
                title="Save"
                onClick={handleEditSubmit}
                style={{
                  marginLeft: "5px",
                }}
              >
                💾
              </button>
            </div>
          ) : (
            <h3 style={{ marginTop: "0" }}>{taskItem.title}</h3>
          )}
          <p>Date: {taskItem.date}</p>
        </div>
        <div>
          {!showEdit && (
            <button
              title="Edit"
              style={{ marginRight: "5px" }}
              onClick={() => setShowEdit(true)}
            >
              ✏️
            </button>
          )}
          <button title="Delete" onClick={() => handleDeleteTask(taskItem.id)}>
            ❌
          </button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {taskItem.status !== STATUA_TYPES.TODO && (
          <span
            style={{ fontSize: "20px", cursor: "pointer" }}
            role="button"
            onClick={() =>
              handleChnageStatus(
                taskItem.id,
                taskItem.status,
                TASK_DIRECTION.BACKWARD,
              )
            }
          >
            ⬅️
          </span>
        )}
        <div></div>

        {taskItem.status !== STATUA_TYPES.DONE && (
          <span
            style={{ fontSize: "20px", cursor: "pointer" }}
            role="button"
            onClick={() =>
              handleChnageStatus(
                taskItem.id,
                taskItem.status,
                TASK_DIRECTION.FORWARD,
              )
            }
          >
            ➡️
          </span>
        )}
      </div>
    </section>
  );
}
