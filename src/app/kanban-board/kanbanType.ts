export enum STATUA_TYPES {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface KanbanDataType {
  id: number;
  title: string;
  date: string;
  status: STATUA_TYPES;
}
