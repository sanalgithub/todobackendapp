export declare abstract class NotificationService {
    abstract sendEmail(to: string, subject: string, text: string): Promise<boolean>;
}
