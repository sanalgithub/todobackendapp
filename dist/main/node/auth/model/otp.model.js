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
exports.Otp = void 0;
const base_model_1 = require("../../common/database/model/base.model");
const user_model_1 = require("../../user/model/user.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Otp = class Otp extends base_model_1.BaseModel {
    constructor(otp) {
        super();
        Object.assign(this, otp);
    }
};
exports.Otp = Otp;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: user_model_1.User.name,
        nullable: true,
    }),
    __metadata("design:type", user_model_1.User)
], Otp.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Otp.prototype, "otp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Otp.prototype, "expiryTime", void 0);
exports.Otp = Otp = __decorate([
    (0, mongoose_1.Schema)(),
    __metadata("design:paramtypes", [Object])
], Otp);
//# sourceMappingURL=otp.model.js.map