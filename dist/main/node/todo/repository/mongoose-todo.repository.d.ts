import { Model } from 'mongoose';
import { Todo, TodoDocument } from '@app/todo/model/todo.model';
import { TodoRepository } from '@app/todo/repository/todo-repository';
export declare class MongooseTodoRepository extends TodoRepository {
    private readonly todoModel;
    constructor(todoModel: Model<TodoDocument>);
    create(todo: Partial<Todo>): Promise<Todo>;
    findOne(id: string): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findByDate(date: string): Promise<Todo[]>;
    delete(id: string): Promise<Todo>;
}
