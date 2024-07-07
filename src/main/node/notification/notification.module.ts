import { Module } from '@nestjs/common';
import { MailerConfig } from '@app/notification/mailer.config';
import { DefaultNotificationService } from '@app/notification/services/default-notification.service';
import { NotificationService } from '@app/notification/services/notification.service';

@Module({
  providers: [
    { provide: NotificationService, useClass: DefaultNotificationService },
    MailerConfig,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
