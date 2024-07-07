import { User } from '@app/user/model/user.model';

export abstract class UserRepository {
  abstract create(user: Partial<User>): Promise<User>;
  abstract existsByEmail(email?: string): Promise<boolean>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract findById(id: string): Promise<User | undefined>;
}
