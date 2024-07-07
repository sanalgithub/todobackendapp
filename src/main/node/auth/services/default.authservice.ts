import { NotificationService } from '@app/notification/services/notification.service';
import { User } from '@app/user/model/user.model';
import { UserService } from '@app/user/service/user.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EmailLoginRequest } from '@app/auth/dto/email-login.request';
import { ForgotPasswordRequest } from '@app/auth/dto/forgot-password.request';
import { AuthService } from '@app/auth/services/auth.service';
import { OtpService } from '@app/auth/services/otp.service';
import { constants } from '../constants';
import { PasswordResetRequest } from '../dto/password-reset.request';

@Injectable()
export class DefaultAuthService extends AuthService {
  private readonly logger = new Logger(DefaultAuthService.name);

  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  async login(request: EmailLoginRequest): Promise<string> {
    this.logger.log(`logging in via email ${request.email}`);
    const user = await this.userService.checkEmailCredentials(
      request.email,
      request.password,
    );
    return user.email;
  }

  async forgotPassword(req: ForgotPasswordRequest): Promise<void> {
    this.logger.log(`Reset password link sends to ${req.email}`);
    const user = await this.userService.getUserByEmail(req.email);
    const userOtpCode = await this.otpService.createOtp(user);
    console.log(userOtpCode.otp);

    if (!userOtpCode) {
      throw new Error(constants.FAILED_TO_CREATE_OTP);
    }
    await this.notificationService.sendEmail(
      req.email,
      constants.YOU_HAVE_REQUESTED_TO_RESET_PASSWORD,
      `${process.env.PASSWORD_RESET_URL}?otp=${userOtpCode.otp}`,
    );
  }

  async resetPassword(req: PasswordResetRequest): Promise<User> {
    const user = await this.userService.getUserByEmail(req.email);
    const isValidToken = await this.otpService.validateUserOtpAndDelete(
      req.otp,
      user,
    );

    if (!isValidToken) {
      throw new NotFoundException(constants.INVALID_OTP);
    }

    if (req.password !== req.confirmPassword) {
      throw new BadRequestException(
        constants.PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_BE_SAME,
      );
    }
    const userOtp = await this.otpService.getOtpForUser(user);
    if (userOtp !== null) {
      await this.otpService.removeOtp(userOtp);
    }
    return this.userService.updatePassword(req.email, req.password);
  }
}
