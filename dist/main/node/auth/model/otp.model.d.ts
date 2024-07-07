import { BaseModel } from '@app/common/database/model/base.model';
import { User } from '@app/user/model/user.model';
export declare class Otp extends BaseModel {
    user: User;
    otp: string;
    expiryTime: Date;
    constructor(otp: Partial<Otp>);
}
