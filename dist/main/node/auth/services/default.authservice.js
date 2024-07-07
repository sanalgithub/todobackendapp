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
var DefaultAuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAuthService = void 0;
const notification_service_1 = require("../../notification/services/notification.service");
const user_service_1 = require("../../user/service/user.service");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const otp_service_1 = require("./otp.service");
const constants_1 = require("../constants");
let DefaultAuthService = DefaultAuthService_1 = class DefaultAuthService extends auth_service_1.AuthService {
    constructor(userService, otpService, notificationService) {
        super();
        this.userService = userService;
        this.otpService = otpService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(DefaultAuthService_1.name);
    }
    async login(request) {
        this.logger.log(`logging in via email ${request.email}`);
        const user = await this.userService.checkEmailCredentials(request.email, request.password);
        return user.email;
    }
    async forgotPassword(req) {
        this.logger.log(`Reset password link sends to ${req.email}`);
        const user = await this.userService.getUserByEmail(req.email);
        const userOtpCode = await this.otpService.createOtp(user);
        console.log(userOtpCode.otp);
        if (!userOtpCode) {
            throw new Error(constants_1.constants.FAILED_TO_CREATE_OTP);
        }
        await this.notificationService.sendEmail(req.email, constants_1.constants.YOU_HAVE_REQUESTED_TO_RESET_PASSWORD, `${process.env.PASSWORD_RESET_URL}?otp=${userOtpCode.otp}`);
    }
    async resetPassword(req) {
        const user = await this.userService.getUserByEmail(req.email);
        const isValidToken = await this.otpService.validateUserOtpAndDelete(req.otp, user);
        if (!isValidToken) {
            throw new common_1.NotFoundException(constants_1.constants.INVALID_OTP);
        }
        if (req.password !== req.confirmPassword) {
            throw new common_1.BadRequestException(constants_1.constants.PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_BE_SAME);
        }
        const userOtp = await this.otpService.getOtpForUser(user);
        if (userOtp !== null) {
            await this.otpService.removeOtp(userOtp);
        }
        return this.userService.updatePassword(req.email, req.password);
    }
};
exports.DefaultAuthService = DefaultAuthService;
exports.DefaultAuthService = DefaultAuthService = DefaultAuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        otp_service_1.OtpService,
        notification_service_1.NotificationService])
], DefaultAuthService);
//# sourceMappingURL=default.authservice.js.map