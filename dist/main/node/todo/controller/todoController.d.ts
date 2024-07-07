import { TodoService } from '@app/todo/service/todo.service';
import { CreateToDoRequest } from '@app/todo/dto/request/create.todo.request';
import { ApiResponse } from 'main/node/common/dto/api.response';
import { TodoResponse } from '@app/todo/dto/request/todo.response';
import { UpdateTodoRequest } from '@app/todo/dto/request/update.todo.request';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    createUser(request: CreateToDoRequest): Promise<ApiResponse<TodoResponse>>;
    getTodosByDate(date: string): Promise<ApiResponse<import("../model/todo.model").Todo[]>>;
    updateTodo(id: string, request: UpdateTodoRequest): Promise<ApiResponse<TodoResponse>>;
    getAllTodoList(): Promise<ApiResponse<import("../model/todo.model").Todo[]>>;
    deleteTodo(id: string): Promise<ApiResponse<unknown>>;
}
