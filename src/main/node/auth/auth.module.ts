import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from '@app/auth/controller/auth.controller';
import { AuthService } from '@app/auth/services/auth.service';
import { DefaultAuthService } from '@app/auth/services/default.authservice';
import { NotificationModule } from '@app/notification/notification.module';
import { UserModule } from '@app/user/user.module';
import { OtpService } from '@app/auth/services/otp.service';
import { DefaultOtpService } from '@app/auth/services/default-otp.service';
import { OtpRepository } from '@app/auth/repository/otp.repository';
import { MongooseOtpRepository } from '@app/auth/repository/mongoose-otp.repository';
import { DataBaseModule } from '@app/common/database/database.module';
import { Otp } from '@app/auth//model/otp.model';

@Module({
  imports: [
    forwardRef(() => UserModule),
    DataBaseModule.forFeature(Otp),
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: AuthService, useClass: DefaultAuthService },
    { provide: OtpService, useClass: DefaultOtpService },
    { provide: OtpRepository, useClass: MongooseOtpRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
