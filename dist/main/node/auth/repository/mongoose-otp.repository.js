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
exports.MongooseOtpRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const otp_model_1 = require("../model/otp.model");
const otp_repository_1 = require("./otp.repository");
let MongooseOtpRepository = class MongooseOtpRepository extends otp_repository_1.OtpRepository {
    constructor(model) {
        super();
        this.model = model;
    }
    async findByTokenAndUser(otp, user) {
        if (!(0, mongoose_2.isValidObjectId)(user)) {
            throw new Error('Invalid userId format');
        }
        const token = await this.model.findOne({
            otp: otp,
            user: new mongoose_2.Types.ObjectId(user),
        });
        if (token) {
            return token.toObject();
        }
        else {
            throw new Error('OTP not found for token: ' + token + ' and userId: ' + user);
        }
    }
    async findByUser(userId) {
        if (!(0, mongoose_2.isValidObjectId)(userId)) {
            throw new Error('Invalid userId format');
        }
        const otp = await this.model.findOne({ user: new mongoose_2.Types.ObjectId(userId) });
        return otp ? otp.toObject() : null;
    }
    async save(otp) {
        const createdOtp = new this.model(otp);
        return createdOtp.save();
    }
    async deleteByUser(userId) {
        if (!(0, mongoose_2.isValidObjectId)(userId)) {
            throw new Error('Invalid userId format');
        }
        await this.model.deleteOne({ user: new mongoose_2.Types.ObjectId(userId) });
    }
};
exports.MongooseOtpRepository = MongooseOtpRepository;
exports.MongooseOtpRepository = MongooseOtpRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_model_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongooseOtpRepository);
//# sourceMappingURL=mongoose-otp.repository.js.map