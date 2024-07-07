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
var DefaultUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const user_model_1 = require("../model/user.model");
const constants_1 = require("../constants");
const class_validator_1 = require("class-validator");
const password_encode_1 = require("../../common/utils/password.encode");
const user_service_1 = require("./user.service");
let DefaultUserService = DefaultUserService_1 = class DefaultUserService extends user_service_1.UserService {
    constructor(userRepository, encoder) {
        super();
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.logger = new common_1.Logger(DefaultUserService_1.name);
    }
    async create(request) {
        this.logger.log('creating user');
        if (await this.exists(request.email)) {
            throw new common_1.BadRequestException(constants_1.constants.USER_EXISTS);
        }
        if (request.password === undefined) {
            throw new common_1.BadRequestException(constants_1.constants.PASSWORD_IS_REQUIRED);
        }
        const user = new user_model_1.User({
            email: request.email,
            password: !(0, class_validator_1.isEmpty)(request.password)
                ? await this.encoder.encode(request.password)
                : undefined,
        });
        return this.userRepository.create(user).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_SAVE_USER, {
                cause: err,
            });
        });
    }
    async checkEmailCredentials(email, password) {
        this.logger.log(`checking credentials of ${email}`);
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(constants_1.constants.FAILED_TO_GET_USER);
        }
        if (!(await this.encoder.matches(user.password, password))) {
            throw new common_1.UnauthorizedException(constants_1.constants.INVALID_CREDENTIALS);
        }
        return user;
    }
    async updatePassword(email, password) {
        this.logger.log('Updating password and saving it to the User database');
        const hashedPassword = await this.encoder.encode(password);
        const user = await this.getUserByEmail(email);
        user.password = hashedPassword;
        await this.userRepository.create(user);
        return user;
    }
    async getUserByEmail(email) {
        this.logger.log(`getting user by email ${email}`);
        const user = await this.userRepository.findByEmail(email).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_GET_USER, {
                cause: err,
            });
        });
        if (!user) {
            throw new common_1.NotFoundException(constants_1.constants.FAILED_TO_GET_USER);
        }
        return user;
    }
    async exists(email) {
        this.logger.debug(`checking if user exists by email ${email}`);
        return this.userRepository.existsByEmail(email).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_CHECK_IF_USER_EXISTS, { cause: err });
        });
    }
    async getUserById(id) {
        this.logger.log(`getting user by id ${id}`);
        const user = await this.userRepository.findById(id).catch((err) => {
            throw new common_1.InternalServerErrorException(constants_1.constants.FAILED_TO_GET_USER, {
                cause: err,
            });
        });
        if (!user) {
            throw new common_1.NotFoundException(constants_1.constants.FAILED_TO_GET_USER);
        }
        return user;
    }
};
exports.DefaultUserService = DefaultUserService;
exports.DefaultUserService = DefaultUserService = DefaultUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        password_encode_1.PasswordEncoder])
], DefaultUserService);
//# sourceMappingURL=default-user.service.js.map