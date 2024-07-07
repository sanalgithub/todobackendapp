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
exports.AuthController = void 0;
const api_response_1 = require("../../common/dto/api.response");
const common_1 = require("@nestjs/common");
const email_login_request_1 = require("../dto/email-login.request");
const forgot_password_request_1 = require("../dto/forgot-password.request");
const auth_service_1 = require("../services/auth.service");
const constants_1 = require("../constants");
const password_reset_request_1 = require("../dto/password-reset.request");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(request) {
        const response = await this.authService.login(request);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.OK,
            message: constants_1.constants.SUCCESSFUL_LOGIN,
            status: true,
            data: [response],
        });
    }
    async forgotPassword(req) {
        await this.authService.forgotPassword(req);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.OK,
            status: true,
            message: constants_1.constants.PASSWORD_RESET_URL_SEND_SUCCESSFULLY,
        });
    }
    async passwordReset(req) {
        await this.authService.resetPassword(req);
        return api_response_1.ApiResponse.create({
            code: common_1.HttpStatus.OK,
            status: true,
            message: constants_1.constants.PASSWORD_CHANGED_SUCCESSFULLY,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_login_request_1.EmailLoginRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_request_1.ForgotPasswordRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_request_1.PasswordResetRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordReset", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map