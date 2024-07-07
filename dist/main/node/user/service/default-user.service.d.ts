import { UserRepository } from '@app/user/repository/user.repository';
import { CreateUserRequest } from '@app/user/dto/create.user.request';
import { User } from '@app/user/model/user.model';
import { PasswordEncoder } from 'main/node/common/utils/password.encode';
import { UserService } from '@app/user/service/user.service';
export declare class DefaultUserService extends UserService {
    private readonly userRepository;
    private encoder;
    private readonly logger;
    constructor(userRepository: UserRepository, encoder: PasswordEncoder);
    create(request: CreateUserRequest): Promise<User>;
    checkEmailCredentials(email: string, password: string): Promise<User>;
    updatePassword(email: string, password: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    private exists;
    getUserById(id: string): Promise<User>;
}
