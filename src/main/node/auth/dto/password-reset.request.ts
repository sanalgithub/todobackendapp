import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { constants } from '@app/auth/constants';
import { passwordMatchRegExp } from '@app/common/utils/passwordRegExp';

export class PasswordResetRequest {
  @IsNotEmpty()
  otp!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  @Matches(passwordMatchRegExp.PASSWORD_REGEX, {
    message: constants.PASSWORD_IS_TOO_WEAK,
  })
  password!: string;

  @IsNotEmpty()
  confirmPassword!: string;
}
