import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '@app/user/repository/user.repository';
import { CreateUserRequest } from '@app/user/dto/create.user.request';
import { User } from '@app/user/model/user.model';
import { constants } from '@app/user/constants';
import { isEmpty } from 'class-validator';
import { PasswordEncoder } from 'main/node/common/utils/password.encode';
import { UserService } from '@app/user/service/user.service';

@Injectable()
export class DefaultUserService extends UserService {
  private readonly logger = new Logger(DefaultUserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private encoder: PasswordEncoder,
  ) {
    super();
  }

  async create(request: CreateUserRequest): Promise<User> {
    this.logger.log('creating user');
    if (await this.exists(request.email)) {
      throw new BadRequestException(constants.USER_EXISTS);
    }
    if (request.password === undefined) {
      throw new BadRequestException(constants.PASSWORD_IS_REQUIRED);
    }
    const user = new User({
      email: request.email,
      password: !isEmpty(request.password)
        ? await this.encoder.encode(request.password)
        : undefined,
    });
    return this.userRepository.create(user).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_SAVE_USER, {
        cause: err,
      });
    });
  }

  async checkEmailCredentials(email: string, password: string): Promise<User> {
    this.logger.log(`checking credentials of ${email}`);
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException(constants.FAILED_TO_GET_USER);
    }

    if (!(await this.encoder.matches(user.password, password))) {
      throw new UnauthorizedException(constants.INVALID_CREDENTIALS);
    }
    return user;
  }

  async updatePassword(email: string, password: string): Promise<User> {
    this.logger.log('Updating password and saving it to the User database');

    const hashedPassword = await this.encoder.encode(password);
    const user = await this.getUserByEmail(email);
    user.password = hashedPassword;
    await this.userRepository.create(user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`getting user by email ${email}`);

    const user = await this.userRepository.findByEmail(email).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_GET_USER, {
        cause: err,
      });
    });
    if (!user) {
      throw new NotFoundException(constants.FAILED_TO_GET_USER);
    }

    return user;
  }

  private async exists(email?: string): Promise<boolean> {
    this.logger.debug(`checking if user exists by email ${email}`);
    return this.userRepository.existsByEmail(email).catch((err) => {
      throw new InternalServerErrorException(
        constants.FAILED_TO_CHECK_IF_USER_EXISTS,
        { cause: err },
      );
    });
  }

  async getUserById(id: string): Promise<User> {
    this.logger.log(`getting user by id ${id}`);
    const user = await this.userRepository.findById(id).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_GET_USER, {
        cause: err,
      });
    });
    if (!user) {
      throw new NotFoundException(constants.FAILED_TO_GET_USER);
    }

    return user;
  }
}
