import { Otp } from '../model/otp.model';
export declare abstract class OtpRepository {
    abstract findByTokenAndUser(otp: string, user: string): Promise<Otp>;
    abstract findByUser(userId: string): Promise<Otp | null>;
    abstract save(otp: Otp): Promise<Otp>;
    abstract deleteByUser(userId: string): Promise<void>;
}
