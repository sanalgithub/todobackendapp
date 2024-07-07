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
var DefaultOtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOtpService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const otp_model_1 = require("../model/otp.model");
const otp_repository_1 = require("../repository/otp.repository");
const otp_service_1 = require("./otp.service");
let DefaultOtpService = DefaultOtpService_1 = class DefaultOtpService extends otp_service_1.OtpService {
    constructor(otpRepository) {
        super();
        this.otpRepository = otpRepository;
        this.logger = new common_1.Logger(DefaultOtpService_1.name);
    }
    async createOtp(user) {
        this.logger.log(`creating otp for user ${user.id}`);
        const otp = new otp_model_1.Otp({
            otp: Math.floor(1000 + Math.random() * 9000).toString(),
            user: user,
            expiryTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        });
        console.log(otp);
        return this.otpRepository.save(otp).catch((error) => Promise.reject(new common_1.InternalServerErrorException({
            cause: error,
            message: constants_1.constants.FAILED_TO_SAVE_OTP,
        })));
    }
    async validateUserOtpAndDelete(otp, user) {
        this.logger.log(`validating otp for user ${user.email}`);
        try {
            const userOtp = await this.otpRepository.findByTokenAndUser(otp, user.id);
            if (!userOtp) {
                return false;
            }
            this.deleteOtp(userOtp).catch((err) => this.logger.error(constants_1.constants.FAILED_TO_DELETE_OTP, err));
            return Date.now() < userOtp.expiryTime.getTime();
        }
        catch (err) {
            return false;
        }
    }
    async removeOtp(otp) {
        this.logger.log(`removing otp`);
        try {
            await this.deleteOtp(otp);
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_DELETE_OTP, {
                cause: err,
            });
        }
    }
    async getOtpForUser(user) {
        this.logger.log(`finding otp ${user.id}`);
        try {
            const userOtp = await this.otpRepository.findByUser(user.id);
            return userOtp;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_FIND_OTP, {
                cause: error,
            });
        }
    }
    async deleteOtp(otpOrId) {
        const id = typeof otpOrId === 'string' ? otpOrId : otpOrId.id;
        this.logger.log(`deleting otp ${id}`);
        await this.otpRepository.deleteByUser(id).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_DELETE_OTP, {
                cause: err,
            });
        });
    }
    generateRandomOtp() {
        const min = 100000;
        const max = 999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    }
};
exports.DefaultOtpService = DefaultOtpService;
exports.DefaultOtpService = DefaultOtpService = DefaultOtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [otp_repository_1.OtpRepository])
], DefaultOtpService);
//# sourceMappingURL=default-otp.service.js.map