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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = exports.Todo = void 0;
const base_model_1 = require("../../common/database/model/base.model");
const mongoose_1 = require("@nestjs/mongoose");
const completedStatus_1 = require("../types/completedStatus");
let Todo = class Todo extends base_model_1.BaseModel {
    constructor(todo) {
        super();
        Object.assign(this, todo);
    }
};
exports.Todo = Todo;
__decorate([
    (0, mongoose_1.Prop)({ type: 'string' }),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'string' }),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'string' }),
    __metadata("design:type", String)
], Todo.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'string' }),
    __metadata("design:type", String)
], Todo.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: 'string', enum: completedStatus_1.IsCompleted }),
    __metadata("design:type", String)
], Todo.prototype, "completed", void 0);
exports.Todo = Todo = __decorate([
    (0, mongoose_1.Schema)({}),
    __metadata("design:paramtypes", [Object])
], Todo);
exports.TodoSchema = mongoose_1.SchemaFactory.createForClass(Todo);
//# sourceMappingURL=todo.model.js.map