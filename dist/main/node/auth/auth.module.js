"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./controller/auth.controller");
const auth_service_1 = require("./services/auth.service");
const default_authservice_1 = require("./services/default.authservice");
const notification_module_1 = require("../notification/notification.module");
const user_module_1 = require("../user/user.module");
const otp_service_1 = require("./services/otp.service");
const default_otp_service_1 = require("./services/default-otp.service");
const otp_repository_1 = require("./repository/otp.repository");
const mongoose_otp_repository_1 = require("./repository/mongoose-otp.repository");
const database_module_1 = require("../common/database/database.module");
const otp_model_1 = require("./model/otp.model");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            database_module_1.DataBaseModule.forFeature(otp_model_1.Otp),
            notification_module_1.NotificationModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            { provide: auth_service_1.AuthService, useClass: default_authservice_1.DefaultAuthService },
            { provide: otp_service_1.OtpService, useClass: default_otp_service_1.DefaultOtpService },
            { provide: otp_repository_1.OtpRepository, useClass: mongoose_otp_repository_1.MongooseOtpRepository },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map