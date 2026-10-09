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
