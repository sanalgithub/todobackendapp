import { ApiResponse } from '@app/common/dto/api.response';
import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { EmailLoginRequest } from '@app/auth/dto/email-login.request';
import { ForgotPasswordRequest } from '@app/auth/dto/forgot-password.request';
import { AuthService } from '@app/auth/services/auth.service';
import { constants } from '@app/auth/constants';
import { PasswordResetRequest } from '@app/auth/dto/password-reset.request';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() request: EmailLoginRequest,
  ): Promise<ApiResponse<string>> {
    const response = await this.authService.login(request);
    return ApiResponse.create({
      code: HttpStatus.OK,
      message: constants.SUCCESSFUL_LOGIN,
      status: true,
      data: [response],
    });
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() req: ForgotPasswordRequest,
  ): Promise<ApiResponse<void>> {
    await this.authService.forgotPassword(req);
    return ApiResponse.create({
      code: HttpStatus.OK,
      status: true,
      message: constants.PASSWORD_RESET_URL_SEND_SUCCESSFULLY,
    });
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async passwordReset(
    @Body() req: PasswordResetRequest,
  ): Promise<ApiResponse<void>> {
    await this.authService.resetPassword(req);
    return ApiResponse.create({
      code: HttpStatus.OK,
      status: true,
      message: constants.PASSWORD_CHANGED_SUCCESSFULLY,
    });
  }
}
