import { Todo } from '@app/todo/model/todo.model';
export declare abstract class TodoRepository {
    abstract create(todo: Partial<Todo>): Promise<Todo>;
    abstract findOne(id: string): Promise<Todo>;
    abstract delete(id: string): Promise<Todo>;
    abstract findAll(): Promise<Todo[]>;
    abstract findByDate(date: string): Promise<Todo[]>;
}
