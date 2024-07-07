import { NotificationService } from '@app/notification/services/notification.service';
import { User } from '@app/user/model/user.model';
import { UserService } from '@app/user/service/user.service';
import { EmailLoginRequest } from '@app/auth/dto/email-login.request';
import { ForgotPasswordRequest } from '@app/auth/dto/forgot-password.request';
import { AuthService } from '@app/auth/services/auth.service';
import { OtpService } from '@app/auth/services/otp.service';
import { PasswordResetRequest } from '../dto/password-reset.request';
export declare class DefaultAuthService extends AuthService {
    private userService;
    private otpService;
    private notificationService;
    private readonly logger;
    constructor(userService: UserService, otpService: OtpService, notificationService: NotificationService);
    login(request: EmailLoginRequest): Promise<string>;
    forgotPassword(req: ForgotPasswordRequest): Promise<void>;
    resetPassword(req: PasswordResetRequest): Promise<User>;
}
