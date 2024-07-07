import { Model } from 'mongoose';
import { User, UserDocument } from '@app/user/model/user.model';
import { UserRepository } from '@app/user/repository/user.repository';
export declare class MongooseUserRepository extends UserRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(user: Partial<User>): Promise<User>;
    existsByEmail(email?: string): Promise<boolean>;
}
