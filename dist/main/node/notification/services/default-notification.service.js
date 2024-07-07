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
var DefaultNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultNotificationService = void 0;
const common_1 = require("@nestjs/common");
const mailer_config_1 = require("../mailer.config");
const notification_service_1 = require("./notification.service");
let DefaultNotificationService = DefaultNotificationService_1 = class DefaultNotificationService extends notification_service_1.NotificationService {
    constructor(mailerConfig) {
        super();
        this.mailerConfig = mailerConfig;
        this.logger = new common_1.Logger(DefaultNotificationService_1.name);
    }
    async sendEmail(to, subject, text) {
        this.logger.log('Sending a email confirmation link');
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to,
            subject,
            text,
        };
        try {
            const info = await this.mailerConfig.transporter.sendMail(mailOptions);
            this.logger.log('Email sent: ' + info.response);
            return true;
        }
        catch (error) {
            this.logger.log('Error sending email:', error);
            return false;
        }
    }
};
exports.DefaultNotificationService = DefaultNotificationService;
exports.DefaultNotificationService = DefaultNotificationService = DefaultNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_config_1.MailerConfig])
], DefaultNotificationService);
//# sourceMappingURL=default-notification.service.js.map