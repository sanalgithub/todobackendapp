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
exports.MongooseTodoRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const todo_model_1 = require("../model/todo.model");
const todo_repository_1 = require("./todo-repository");
let MongooseTodoRepository = class MongooseTodoRepository extends todo_repository_1.TodoRepository {
    constructor(todoModel) {
        super();
        this.todoModel = todoModel;
    }
    async create(todo) {
        const createdTodo = new this.todoModel(todo);
        return createdTodo.save();
    }
    async findOne(id) {
        return this.todoModel.findById(id).exec();
    }
    async findAll() {
        return this.todoModel.find().exec();
    }
    async findByDate(date) {
        return this.todoModel.find({ date }).exec();
    }
    async delete(id) {
        return this.todoModel.findByIdAndDelete(id).exec();
    }
};
exports.MongooseTodoRepository = MongooseTodoRepository;
exports.MongooseTodoRepository = MongooseTodoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_model_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseTodoRepository);
//# sourceMappingURL=mongoose-todo.repository.js.map