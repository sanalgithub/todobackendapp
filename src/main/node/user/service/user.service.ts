import { CreateUserRequest } from '@app/user/dto/create.user.request';
import { User } from '@app/user/model/user.model';

export abstract class UserService {
  abstract create(request: CreateUserRequest): Promise<User>;
  abstract updatePassword(email: string, password: string): Promise<User>;
  abstract getUserById(id: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract checkEmailCredentials(
    email: string,
    password: string,
  ): Promise<User>;
}
