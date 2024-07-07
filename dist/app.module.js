"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_1 = require("./main/node/auth");
const database_module_1 = require("./main/node/common/database/database.module");
const notification_module_1 = require("./main/node/notification/notification.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const todo_module_1 = require("./main/node/todo/todo.module");
const user_module_1 = require("./main/node/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            todo_module_1.TodoModule,
            user_module_1.UserModule,
            auth_1.AuthModule,
            database_module_1.DataBaseModule,
            notification_module_1.NotificationModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://root:root@cluster0.etivdl5.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0'),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map