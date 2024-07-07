import { Module } from "@nestjs/common";
import { DataBaseModule } from "@app/common/database/database.module";
import { Todo } from "@app/todo/model/todo.model";
import { TodoController } from "@app/todo/controller/todoController";
import { TodoRepository } from "@app/todo/repository/todo-repository";
import { MongooseTodoRepository } from "@app/todo/repository/mongoose-todo.repository";
import { TodoService } from "@app/todo/service/todo.service";
import { DefaultTodoService } from "@app/todo/service/default-todo.service";


@Module({
  imports: [
    DataBaseModule.forFeature(Todo),
  ],
  controllers: [TodoController],
  providers: [
    { provide: TodoRepository, useClass: MongooseTodoRepository },
    { provide: TodoService, useClass: DefaultTodoService },
  ],
  exports: [TodoService],
})
export class TodoModule {}
