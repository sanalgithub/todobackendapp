import { ApiResponse } from '@app/common/dto/api.response';
import { EmailLoginRequest } from '@app/auth/dto/email-login.request';
import { ForgotPasswordRequest } from '@app/auth/dto/forgot-password.request';
import { AuthService } from '@app/auth/services/auth.service';
import { PasswordResetRequest } from '@app/auth/dto/password-reset.request';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(request: EmailLoginRequest): Promise<ApiResponse<string>>;
    forgotPassword(req: ForgotPasswordRequest): Promise<ApiResponse<void>>;
    passwordReset(req: PasswordResetRequest): Promise<ApiResponse<void>>;
}
