import { KanbanDataType } from "./kanbanType";

export default function TaskComp({ taskItem }: { taskItem: KanbanDataType }) {
  return (
    <section
      style={{
        border: "1px solid orange",
        borderRadius: "4px",
        padding: "10px",
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
          <h3 style={{ marginTop: "0" }}>{taskItem.title}</h3>
          <p>Date: {taskItem.date}</p>
        </div>
        <div>
          <button>E</button>
          <button>D</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button>{"<"}</button>
        <div></div>
        <button>{">"}</button>
      </div>
    </section>
  );
}
