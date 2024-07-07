"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../common/database/database.module");
const todo_model_1 = require("./model/todo.model");
const todoController_1 = require("./controller/todoController");
const todo_repository_1 = require("./repository/todo-repository");
const mongoose_todo_repository_1 = require("./repository/mongoose-todo.repository");
const todo_service_1 = require("./service/todo.service");
const default_todo_service_1 = require("./service/default-todo.service");
let TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule;
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DataBaseModule.forFeature(todo_model_1.Todo),
        ],
        controllers: [todoController_1.TodoController],
        providers: [
            { provide: todo_repository_1.TodoRepository, useClass: mongoose_todo_repository_1.MongooseTodoRepository },
            { provide: todo_service_1.TodoService, useClass: default_todo_service_1.DefaultTodoService },
        ],
        exports: [todo_service_1.TodoService],
    })
], TodoModule);
//# sourceMappingURL=todo.module.js.map