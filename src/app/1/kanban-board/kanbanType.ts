export enum STATUA_TYPES {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum TASK_DIRECTION {
  FORWARD = "forward",
  BACKWARD = "backward",
}

export interface KanbanDataType {
  id: number;
  title: string;
  date: string;
  status: STATUA_TYPES;
}

export const taskColumn = [
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
