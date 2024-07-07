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
exports.CreateToDoRequest = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
const completedStatus_1 = require("../../types/completedStatus");
class CreateToDoRequest {
}
exports.CreateToDoRequest = CreateToDoRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: constants_1.constants.TITLE_SHOULD_BE_STRING }),
    __metadata("design:type", String)
], CreateToDoRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: constants_1.constants.DESCRIPTION_SHOULD_BE_STRING }),
    __metadata("design:type", String)
], CreateToDoRequest.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: constants_1.constants.DATE_SHOULD_BE_STRING }),
    __metadata("design:type", String)
], CreateToDoRequest.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: constants_1.constants.TIME_SHOULD_BE_STRING }),
    __metadata("design:type", String)
], CreateToDoRequest.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateToDoRequest.prototype, "completed", void 0);
//# sourceMappingURL=create.todo.request.js.map