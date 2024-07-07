import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TodoService } from '@app/todo/service/todo.service';
import { CreateToDoRequest } from '@app/todo/dto/request/create.todo.request';
import { Todo } from '@app/todo/model/todo.model';
import { UpdateTodoRequest } from '@app/todo/dto/request/update.todo.request';
import { constants } from '@app/todo/constants';
import { TodoRepository } from '@app/todo/repository/todo-repository';
import { IsCompleted } from '../types/completedStatus';

@Injectable()
export class DefaultTodoService extends TodoService {
  private logger = new Logger(DefaultTodoService.name);

  constructor(private todoReposiotry: TodoRepository) {
    super();
  }

  async create(request: CreateToDoRequest): Promise<Todo> {
    this.logger.log('saves field in todo model');
    const todo = new Todo({
      title: request.title,
      description: request.description,
      date: request.date,
      time: request.time,
      completed: request.completed ?? IsCompleted.OFF,
    });
    return this.todoReposiotry.create(todo).catch((err) => {
      throw new InternalServerErrorException(
        constants.FAILED_TO_SAVE_TODO_FIELDS,
        {
          cause: err,
        },
      );
    });
  }

  async getTodosByDate(date: string): Promise<Todo[]> {
    this.logger.log(`getting todos by date ${date}`);
    return this.todoReposiotry.findByDate(date).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_GET_TODO, {
        cause: err,
      });
    });
  }

  async getTodo(id: string): Promise<Todo> {
    this.logger.log(`getting todo by id ${id}`);
    const todo = await this.todoReposiotry.findOne(id).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_GET_TODO, {
        cause: err,
      });
    });
    return todo;
  }

  async update(id: string, request: UpdateTodoRequest): Promise<Todo> {
    this.logger.log(`updates the todo field by ${id}`);
    const todo = await this.getTodo(id);
    todo.title = request.title;
    todo.description = request.description;
    todo.date = request.date;

    if (request.completed === 'ON') {
      todo.completed = IsCompleted.ON;
    } else if (request.completed === 'OFF') {
      todo.completed = IsCompleted.OFF;
    }

    return this.todoReposiotry.create(todo).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_UPDATE_TODO, {
        cause: err,
      });
    });
  }

  async getAllTodos(): Promise<Todo[]> {
    this.logger.log('getting all todos');
    const todos = await this.todoReposiotry.findAll().catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_GET_TODO, {
        cause: err,
      });
    });
    return todos;
  }

  async delete(id: string): Promise<Todo> {
    return this.todoReposiotry.delete(id).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_DELETE_TODO, {
        cause: err,
      });
    });
  }
}
