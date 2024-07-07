import { EmailLoginRequest } from '@app/auth//dto/email-login.request';
import { ForgotPasswordRequest } from '@app/auth//dto/forgot-password.request';
import { User } from '@app/user/model/user.model';
import { PasswordResetRequest } from '@app/auth/dto/password-reset.request';
export declare abstract class AuthService {
    abstract login(request: EmailLoginRequest): Promise<string>;
    abstract forgotPassword(req: ForgotPasswordRequest): Promise<void>;
    abstract resetPassword(req: PasswordResetRequest): Promise<User>;
}
