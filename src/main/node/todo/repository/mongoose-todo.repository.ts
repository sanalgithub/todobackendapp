import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from '@app/todo/model/todo.model';
import { TodoRepository } from '@app/todo/repository/todo-repository';

@Injectable()
export class MongooseTodoRepository extends TodoRepository {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {
    super();
  }

  async create(todo: Partial<Todo>): Promise<Todo> {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findByDate(date: string): Promise<Todo[]> {
    return this.todoModel.find({ date }).exec();
  }

  async delete(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
