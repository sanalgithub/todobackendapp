import { CreateToDoRequest } from '@app/todo/dto/request/create.todo.request';
import { UpdateTodoRequest } from '@app/todo/dto/request/update.todo.request';
import { Todo } from '@app/todo/model/todo.model';

export abstract class TodoService {
  abstract create(request: CreateToDoRequest): Promise<Todo>;
  abstract getTodo(id: string): Promise<Todo>;
  abstract update(id: string, request: UpdateTodoRequest): Promise<Todo>;
  abstract delete(id: string): Promise<Todo>;
  abstract getAllTodos(): Promise<Todo[]>;
  abstract getTodosByDate(date: string): Promise<Todo[]>;
}
