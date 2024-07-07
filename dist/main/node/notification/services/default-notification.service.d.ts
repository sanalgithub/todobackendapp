import { MailerConfig } from '@app/notification/mailer.config';
import { NotificationService } from '@app/notification/services/notification.service';
export declare class DefaultNotificationService extends NotificationService {
    private mailerConfig;
    private readonly logger;
    constructor(mailerConfig: MailerConfig);
    sendEmail(to: string, subject: string, text: string): Promise<boolean>;
}
