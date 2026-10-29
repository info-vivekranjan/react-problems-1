export enum DIRECTION_ENUM {
    FORWARD = 'forward',
    BACKWARD = 'backward'
}

export enum STATUS_ENUM {
    TO_DO = 'todo',
    IN_PROGRESS = 'inprogress',
    DONE = 'done',
}

export interface KanbanTaskType {
    id: number;
    title: string;
    date: string;
    status: STATUS_ENUM;
}