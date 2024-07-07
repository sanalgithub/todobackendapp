import { Otp } from '@app/auth/model/otp.model';
import { OtpRepository } from '@app/auth//repository/otp.repository';
import { OtpService } from '@app/auth//services/otp.service';
import { User } from '@app/user/model/user.model';
export declare class DefaultOtpService extends OtpService {
    private otpRepository;
    private readonly logger;
    constructor(otpRepository: OtpRepository);
    createOtp(user: User): Promise<Otp | undefined>;
    validateUserOtpAndDelete(otp: string, user: User): Promise<boolean>;
    removeOtp(otp: Otp): Promise<void>;
    getOtpForUser(user: User): Promise<Otp | null>;
    private deleteOtp;
    private generateRandomOtp;
}
