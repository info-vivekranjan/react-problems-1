"use client";

import { useState } from "react";
import { KanbanTask, STATUS_ENUM } from "./KanbanBoardType";

export default function KanbanBoard() {

    const [initialState, setInitialState] = useState({
        title: "",
        date: ""
    })

    const [taskData, setTaskData] = useState<KanbanTask[]>([])


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
        </>
    )
}