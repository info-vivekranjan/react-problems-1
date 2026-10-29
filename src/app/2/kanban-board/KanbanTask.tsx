"use client";

import React from "react"
import { DIRECTION_ENUM, KanbanTaskType, STATUS_ENUM } from "./KanbanBoardType";

export default React.memo(function KanbanTask({ task, handleChangeStatus }: { task: KanbanTaskType, handleChangeStatus: (id: number, status: STATUS_ENUM, direction: DIRECTION_ENUM) => void }) {
    return (
        <section style={{ border: "1px solid orange", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <h3 style={{ marginTop: 0 }}>Title: {task.title}</h3>
                    <p>Date: {task.date}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button>✏️</button>
                    <button>❌</button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {task.status !== STATUS_ENUM.TO_DO && <button onClick={() => handleChangeStatus(task.id, task.status, DIRECTION_ENUM.BACKWARD)}>⬅️</button>}
                <div></div>
                {task.status !== STATUS_ENUM.DONE && <button onClick={() => handleChangeStatus(task.id, task.status, DIRECTION_ENUM.FORWARD)}>➡️</button>}
            </div>
        </section>
    )
})