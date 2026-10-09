"use client";

import React, { useCallback, useState } from "react";
import { KanbanDataType, STATUA_TYPES, TASK_DIRECTION } from "./kanbanType";
import TaskComp from "./TaskComp";

const taskColumn = [
  {
    label: "Todo",
    statusType: STATUA_TYPES.TODO,
    color: "red",
  },
  {
    label: "In Progress",
    statusType: STATUA_TYPES.IN_PROGRESS,
    color: "blue",
  },
  {
    label: "Done",
    statusType: STATUA_TYPES.DONE,
    color: "green",
  },
];

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

    if (formInput.title.trim() === "" || formInput.date.trim() === "") {
      alert("Both fields are required");
      return;
    }

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

  const handleChnageStatus = useCallback(
    (id: number, status: STATUA_TYPES, direction: TASK_DIRECTION) => {
      if (direction === TASK_DIRECTION.FORWARD) {
        if (status === STATUA_TYPES.TODO) {
          setTask((prev) => {
            return prev.map((item) => {
              return item.id === id
                ? { ...item, status: STATUA_TYPES.IN_PROGRESS }
                : item;
            });
          });
        } else if (status === STATUA_TYPES.IN_PROGRESS) {
          setTask((prev) => {
            return prev.map((item) => {
              return item.id === id
                ? { ...item, status: STATUA_TYPES.DONE }
                : item;
            });
          });
        }
      } else if (direction === TASK_DIRECTION.BACKWARD) {
        if (status === STATUA_TYPES.DONE) {
          setTask((prev) => {
            return prev.map((item) => {
              return item.id === id
                ? { ...item, status: STATUA_TYPES.IN_PROGRESS }
                : item;
            });
          });
        } else if (status === STATUA_TYPES.IN_PROGRESS) {
          setTask((prev) => {
            return prev.map((item) => {
              return item.id === id
                ? { ...item, status: STATUA_TYPES.TODO }
                : item;
            });
          });
        }
      }
    },
    [],
  );

  const handleDeleteTask = useCallback((id: number) => {
    setTask((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  }, []);

  const handleEditTask = useCallback((id: number, title: string) => {
    setTask((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, title } : item;
      });
    });
  }, []);

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
            placeholder="Task 1"
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
              backgroundColor: "orange",
              fontSize: "18px",
            }}
          />
        </div>
      </form>
      <hr />
      <h2>Tasks</h2>
      <section
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {taskColumn.map((column) => {
          return (
            <div
              style={{
                border: `2px solid ${column.color}`,
                padding: "15px",
                minWidth: "250px",
              }}
            >
              <h3 style={{ color: column.color, marginTop: "0" }}>
                {column.label}
              </h3>
              {task
                .filter((item) => item.status === column.statusType)
                .map((taskItem) => {
                  return (
                    <TaskComp
                      key={taskItem.id}
                      taskItem={taskItem}
                      handleChnageStatus={handleChnageStatus}
                      handleDeleteTask={handleDeleteTask}
                      handleEditTask={handleEditTask}
                    />
                  );
                })}
            </div>
          );
        })}
      </section>
    </>
  );
}
