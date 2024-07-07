import { BaseModel } from '@app/common/database/model/base.model';
import { IsCompleted } from '@app/todo/types/completedStatus';
export declare class Todo extends BaseModel {
    title: string;
    description: string;
    date: string;
    time: string;
    completed: IsCompleted;
    constructor(todo: Partial<Todo>);
}
export type TodoDocument = Todo & Document;
export declare const TodoSchema: import("mongoose").Schema<Todo, import("mongoose").Model<Todo, any, any, any, import("mongoose").Document<unknown, any, Todo> & Todo & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Todo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Todo>> & import("mongoose").FlatRecord<Todo> & {
    _id: import("mongoose").Types.ObjectId;
}>;
