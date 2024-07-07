import { User } from '@app/user/model/user.model';
import { Otp } from '@app/auth/model/otp.model';

export abstract class OtpService {
  abstract createOtp(user: User): Promise<Otp | undefined>;
  abstract validateUserOtpAndDelete(otp: string, user: User): Promise<boolean>;
  abstract removeOtp(otp: Otp): Promise<void>;
  abstract getOtpForUser(user: User): Promise<Otp | null>;
}
