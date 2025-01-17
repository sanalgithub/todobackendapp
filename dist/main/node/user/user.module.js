"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../common/database/database.module");
const user_model_1 = require("./model/user.model");
const user_controller_1 = require("./controller/user.controller");
const user_repository_1 = require("./repository/user.repository");
const mongoose_user_repository_1 = require("./repository/mongoose.user.repository");
const user_service_1 = require("./service/user.service");
const default_user_service_1 = require("./service/default-user.service");
const password_encode_1 = require("../common/utils/password.encode");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DataBaseModule.forFeature(user_model_1.User),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            { provide: user_repository_1.UserRepository, useClass: mongoose_user_repository_1.MongooseUserRepository },
            { provide: user_service_1.UserService, useClass: default_user_service_1.DefaultUserService },
            password_encode_1.PasswordEncoder
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map