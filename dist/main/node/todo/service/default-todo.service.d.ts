import { TodoService } from '@app/todo/service/todo.service';
import { CreateToDoRequest } from '@app/todo/dto/request/create.todo.request';
import { Todo } from '@app/todo/model/todo.model';
import { UpdateTodoRequest } from '@app/todo/dto/request/update.todo.request';
import { TodoRepository } from '@app/todo/repository/todo-repository';
export declare class DefaultTodoService extends TodoService {
    private todoReposiotry;
    private logger;
    constructor(todoReposiotry: TodoRepository);
    create(request: CreateToDoRequest): Promise<Todo>;
    getTodosByDate(date: string): Promise<Todo[]>;
    getTodo(id: string): Promise<Todo>;
    update(id: string, request: UpdateTodoRequest): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
    delete(id: string): Promise<Todo>;
}
