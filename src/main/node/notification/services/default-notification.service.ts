import { Injectable, Logger } from '@nestjs/common';
import { MailerConfig } from '@app/notification/mailer.config';
import { NotificationService } from '@app/notification/services/notification.service';

@Injectable()
export class DefaultNotificationService extends NotificationService {
  private readonly logger = new Logger(DefaultNotificationService.name);
  constructor(private mailerConfig: MailerConfig) {
    super();
  }

  async sendEmail(to: string, subject: string, text: string): Promise<boolean> {
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
    } catch (error) {
      this.logger.log('Error sending email:', error);
      return false;
    }
  }
}
