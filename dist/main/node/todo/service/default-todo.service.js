"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DefaultTodoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTodoService = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todo_model_1 = require("../model/todo.model");
const constants_1 = require("../constants");
const todo_repository_1 = require("../repository/todo-repository");
const completedStatus_1 = require("../types/completedStatus");
let DefaultTodoService = DefaultTodoService_1 = class DefaultTodoService extends todo_service_1.TodoService {
    constructor(todoReposiotry) {
        super();
        this.todoReposiotry = todoReposiotry;
        this.logger = new common_1.Logger(DefaultTodoService_1.name);
    }
    async create(request) {
        this.logger.log('saves field in todo model');
        const todo = new todo_model_1.Todo({
            title: request.title,
            description: request.description,
            date: request.date,
            time: request.time,
            completed: request.completed ?? completedStatus_1.IsCompleted.OFF,
        });
        return this.todoReposiotry.create(todo).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_SAVE_TODO_FIELDS, {
                cause: err,
            });
        });
    }
    async getTodosByDate(date) {
        this.logger.log(`getting todos by date ${date}`);
        return this.todoReposiotry.findByDate(date).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_GET_TODO, {
                cause: err,
            });
        });
    }
    async getTodo(id) {
        this.logger.log(`getting todo by id ${id}`);
        const todo = await this.todoReposiotry.findOne(id).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_GET_TODO, {
                cause: err,
            });
        });
        return todo;
    }
    async update(id, request) {
        this.logger.log(`updates the todo field by ${id}`);
        const todo = await this.getTodo(id);
        todo.title = request.title;
        todo.description = request.description;
        todo.date = request.date;
        if (request.completed === 'ON') {
            todo.completed = completedStatus_1.IsCompleted.ON;
        }
        else if (request.completed === 'OFF') {
            todo.completed = completedStatus_1.IsCompleted.OFF;
        }
        return this.todoReposiotry.create(todo).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_UPDATE_TODO, {
                cause: err,
            });
        });
    }
    async getAllTodos() {
        this.logger.log('getting all todos');
        const todos = await this.todoReposiotry.findAll().catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_GET_TODO, {
                cause: err,
            });
        });
        return todos;
    }
    async delete(id) {
        return this.todoReposiotry.delete(id).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_DELETE_TODO, {
                cause: err,
            });
        });
    }
};
exports.DefaultTodoService = DefaultTodoService;
exports.DefaultTodoService = DefaultTodoService = DefaultTodoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_repository_1.TodoRepository])
], DefaultTodoService);
//# sourceMappingURL=default-todo.service.js.map