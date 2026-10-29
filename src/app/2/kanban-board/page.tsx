"use client";

import { useCallback, useState } from "react";
import { DIRECTION_ENUM, KanbanTaskType, STATUS_ENUM } from "./KanbanBoardType";
import KanbanTask from "./KanbanTask";

const headerItem = [
    {
        id: 1,
        title: "To Do",
        status: STATUS_ENUM.TO_DO,
        color: "red"
    },
    {
        id: 2,
        title: "In Progress",
        status: STATUS_ENUM.IN_PROGRESS,
        color: "blue"
    },
    {
        id: 3,
        title: "Done",
        status: STATUS_ENUM.DONE,
        color: "green"
    },
]

export default function KanbanBoard() {

    const [initialState, setInitialState] = useState({
        title: "",
        date: ""
    })

    const [taskData, setTaskData] = useState<KanbanTaskType[]>([])


    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setInitialState((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }


    const handleAddTask = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const payload = {
            id: Date.now(),
            title: initialState.title,
            date: initialState.date,
            status: STATUS_ENUM.TO_DO
        }

        setTaskData((prev) => [...prev, payload])
        setInitialState({ title: "", date: "" })
    }

    const handleChangeStatus = useCallback((id: number, status: STATUS_ENUM, direction: DIRECTION_ENUM) => {

        if (direction === DIRECTION_ENUM.FORWARD) {
            if (status === STATUS_ENUM.TO_DO) {
                setTaskData((prev) => {
                    return prev.map((item) => {
                        return item.id === id ? { ...item, status: STATUS_ENUM.IN_PROGRESS } : item
                    })
                })
            } else if (status === STATUS_ENUM.IN_PROGRESS) {
                setTaskData((prev) => {
                    return prev.map((item) => {
                        return item.id === id ? { ...item, status: STATUS_ENUM.DONE } : item
                    })
                })
            }
        } else if (direction === DIRECTION_ENUM.BACKWARD) {
            if (status === STATUS_ENUM.DONE) {
                setTaskData((prev) => {
                    return prev.map((item) => {
                        return item.id === id ? { ...item, status: STATUS_ENUM.IN_PROGRESS } : item
                    })
                })
            } else if (status === STATUS_ENUM.IN_PROGRESS) {
                setTaskData((prev) => {
                    return prev.map((item) => {
                        return item.id === id ? { ...item, status: STATUS_ENUM.TO_DO } : item
                    })
                })
            }
        }

    }, [])

    console.log(taskData)

    return (
        <>
            <h1>Kanban Board</h1>
            <form onSubmit={handleAddTask}>
                <div>
                    <label htmlFor="title">
                        <h3>Title</h3>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        id="title"
                        value={initialState.title}
                        onChange={handleChangeValue}
                        style={{ padding: "10px", fontSize: "25px", width: "300px" }}
                    />
                </div>
                <div>
                    <label htmlFor="date">
                        <h3>Date</h3>
                    </label>
                    <input
                        type="date"
                        placeholder="Enter date"
                        name="date"
                        id="date"
                        value={initialState.date}
                        onChange={handleChangeValue}
                        style={{ padding: "10px", fontSize: "25px", width: "300px" }}
                    />
                </div>

                <div style={{ marginTop: "15px" }}>
                    <input type="submit" value="Submit" style={{ padding: "10px", fontSize: "20px" }} />
                </div>
            </form>

            <br />
            <hr />
            <br />

            <div style={{ display: "flex", gap: "20px" }}>

                {
                    headerItem?.map((headItem) => {
                        return <div style={{ width: "300px", border: `3px solid ${headItem.color}`, padding: "10px", fontSize: "25px" }}>
                            <h2>{headItem.title}</h2>

                            {
                                taskData?.filter((item) => item.status === headItem.status)?.map((task) => {
                                    return <KanbanTask task={task} key={task.id} handleChangeStatus={handleChangeStatus} />
                                })
                            }

                        </div>
                    })
                }

            </div>


        </>
    )
}