import { Model } from 'mongoose';
import { Otp } from '@app/auth/model/otp.model';
import { OtpRepository } from '@app/auth/repository/otp.repository';
export declare class MongooseOtpRepository extends OtpRepository {
    readonly model: Model<Otp>;
    constructor(model: Model<Otp>);
    findByTokenAndUser(otp: string, user: string): Promise<Otp>;
    findByUser(userId: string): Promise<Otp | null>;
    save(otp: Otp): Promise<Otp>;
    deleteByUser(userId: string): Promise<void>;
}
