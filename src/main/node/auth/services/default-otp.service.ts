import crypto from 'crypto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { constants } from '@app/auth/constants';
import { Otp } from '@app/auth/model/otp.model';
import { OtpRepository } from '@app/auth//repository/otp.repository';
import { OtpService } from '@app/auth//services/otp.service';
import { User } from '@app/user/model/user.model';

@Injectable()
export class DefaultOtpService extends OtpService {
  private readonly logger = new Logger(DefaultOtpService.name);

  constructor(private otpRepository: OtpRepository) {
    super();
  }

  async createOtp(user: User): Promise<Otp | undefined> {
    this.logger.log(`creating otp for user ${user.id}`);
    const otp = new Otp({
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      user: user,
      expiryTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    });
    console.log(otp);

    return this.otpRepository.save(otp).catch((error) =>
      Promise.reject(
        new InternalServerErrorException({
          cause: error,
          message: constants.FAILED_TO_SAVE_OTP,
        }),
      ),
    );
  }

  async validateUserOtpAndDelete(otp: string, user: User): Promise<boolean> {
    this.logger.log(`validating otp for user ${user.email}`);
    try {
      const userOtp = await this.otpRepository.findByTokenAndUser(otp, user.id);

      if (!userOtp) {
        return false;
      }

      this.deleteOtp(userOtp).catch((err) =>
        this.logger.error(constants.FAILED_TO_DELETE_OTP, err),
      );
      return Date.now() < userOtp.expiryTime.getTime();
    } catch (err) {
      return false;
    }
  }

  async removeOtp(otp: Otp): Promise<void> {
    this.logger.log(`removing otp`);
    try {
      await this.deleteOtp(otp);
    } catch (err) {
      throw new InternalServerErrorException(constants.FAILED_TO_DELETE_OTP, {
        cause: err,
      });
    }
  }

  async getOtpForUser(user: User): Promise<Otp | null> {
    this.logger.log(`finding otp ${user.id}`);
    try {
      const userOtp = await this.otpRepository.findByUser(user.id);

      return userOtp;
    } catch (error) {
      throw new InternalServerErrorException(constants.FAILED_TO_FIND_OTP, {
        cause: error,
      });
    }
  }

  private async deleteOtp(otpOrId: string | Otp): Promise<void> {
    const id = typeof otpOrId === 'string' ? otpOrId : otpOrId.id;
    this.logger.log(`deleting otp ${id}`);
    await this.otpRepository.deleteByUser(id).catch((err) => {
      throw new InternalServerErrorException(constants.FAILED_TO_DELETE_OTP, {
        cause: err,
      });
    });
  }

  private generateRandomOtp(): string {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
  }
}
