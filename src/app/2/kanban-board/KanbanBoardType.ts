export enum STATUS_ENUM {
    TO_DO = 'todo',
    IN_PROGRESS = 'inprogress',
    DONE = 'done',
}

export interface KanbanTask {
    id: number;
    title: string;
    date: string;
    status: STATUS_ENUM;
}