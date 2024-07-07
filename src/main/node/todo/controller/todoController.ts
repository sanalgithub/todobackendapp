import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { TodoService } from '@app/todo/service/todo.service';
import { CreateToDoRequest } from '@app/todo/dto/request/create.todo.request';
import { ApiResponse } from 'main/node/common/dto/api.response';
import { TodoResponse } from '@app/todo/dto/request/todo.response';
import { constants } from '@app/todo/constants';
import { UpdateTodoRequest } from '@app/todo/dto/request/update.todo.request';
@Controller('/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() request: CreateToDoRequest,
  ): Promise<ApiResponse<TodoResponse>> {
    const todo = await this.todoService.create(request);
    return ApiResponse.create({
      code: HttpStatus.CREATED,
      message: constants.TODO_CREATED,
      status: true,
      data: [todo],
    });
  }

  @Get('/by-date')
  async getTodosByDate(@Query('date') date: string) {
    const getTodoByDate = await this.todoService.getTodosByDate(date);
    return ApiResponse.create({
      code: HttpStatus.CREATED,
      message: constants.TODO_LISTED,
      status: true,
      data: [getTodoByDate],
    });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTodo(
    @Param('id') id: string,
    @Body() request: UpdateTodoRequest,
  ): Promise<ApiResponse<TodoResponse>> {
    const todo = await this.todoService.update(id, request);
    return ApiResponse.create({
      code: HttpStatus.OK,
      message: constants.TODO_UPDATED,
      status: true,
      data: [todo],
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTodoList() {
    const todo = await this.todoService.getAllTodos();
    return ApiResponse.create({
      code: HttpStatus.OK,
      message: constants.TODO_LISTED,
      status: true,
      data: [todo],
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(@Param('id') id: string) {
    await this.todoService.delete(id);
    return ApiResponse.create({
      code: HttpStatus.NO_CONTENT,
      message: constants.TODO_DELETED,
      status: true,
      data: null,
    });
  }
}
