import { IsCompleted } from '@app/todo/types/completedStatus';
export declare class CreateToDoRequest {
    title: string;
    description: string;
    date: string;
    time: string;
    completed?: IsCompleted;
}
