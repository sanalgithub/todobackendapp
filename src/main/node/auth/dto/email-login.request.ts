import { IsEmail, IsNotEmpty } from 'class-validator';
import { constants } from '@app/auth/constants';

export class EmailLoginRequest {
  @IsNotEmpty({ message: constants.EMAIL_IS_REQUIRED })
  @IsEmail({}, { message: constants.EMAIL_SHOULD_BE_VALID })
  email!: string;

  @IsNotEmpty({ message: constants.PASSWORD_IS_REQUIRED })
  password!: string;
}
