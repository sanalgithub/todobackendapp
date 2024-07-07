import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { constants } from '@app/user/constants';
import { passwordMatchRegExp } from 'main/node/common/utils/passwordRegExp';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail({}, { message: constants.EMAIL_SHOULD_BE_VALID })
  email!: string;

  @IsNotEmpty()
  @Matches(passwordMatchRegExp.PASSWORD_REGEX, {
    message: constants.PASSWORD_IS_TOO_WEAK,
  })
  password?: string;
}
