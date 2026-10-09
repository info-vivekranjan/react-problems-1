import { KanbanDataType, STATUA_TYPES, TASK_DIRECTION } from "./kanbanType";

export default function TaskComp({
  taskItem,
  handleChnageStatus,
  handleDeleteTask,
}: {
  taskItem: KanbanDataType;
  handleChnageStatus: (
    id: number,
    status: STATUA_TYPES,
    direction: TASK_DIRECTION,
  ) => void;
  handleDeleteTask: (id: number) => void;
}) {
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
          <h3 style={{ marginTop: "0" }}>{taskItem.title}</h3>
          <p>Date: {taskItem.date}</p>
        </div>
        <div>
          <button title="Edit" style={{ marginRight: "5px" }}>
            ✏️
          </button>
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
