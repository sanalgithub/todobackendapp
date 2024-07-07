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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("../service/todo.service");
const create_todo_request_1 = require("../dto/request/create.todo.request");
const api_response_1 = require("../../common/dto/api.response");
const constants_1 = require("../constants");
const update_todo_request_1 = require("../dto/request/update.todo.request");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async createUser(request) {
        const todo = await this.todoService.create(request);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.CREATED,
            message: constants_1.constants.TODO_CREATED,
            status: true,
            data: [todo],
        });
    }
    async getTodosByDate(date) {
        const getTodoByDate = await this.todoService.getTodosByDate(date);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.CREATED,
            message: constants_1.constants.TODO_LISTED,
            status: true,
            data: [getTodoByDate],
        });
    }
    async updateTodo(id, request) {
        const todo = await this.todoService.update(id, request);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.OK,
            message: constants_1.constants.TODO_UPDATED,
            status: true,
            data: [todo],
        });
    }
    async getAllTodoList() {
        const todo = await this.todoService.getAllTodos();
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.OK,
            message: constants_1.constants.TODO_LISTED,
            status: true,
            data: [todo],
        });
    }
    async deleteTodo(id) {
        await this.todoService.delete(id);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.NO_CONTENT,
            message: constants_1.constants.TODO_DELETED,
            status: true,
            data: null,
        });
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_request_1.CreateToDoRequest]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/by-date'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getTodosByDate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_request_1.UpdateTodoRequest]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodoList", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('/todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todoController.js.map