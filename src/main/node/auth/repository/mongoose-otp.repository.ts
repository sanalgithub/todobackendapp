import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { Otp } from '@app/auth/model/otp.model';
import { OtpRepository } from '@app/auth/repository/otp.repository';

@Injectable()
export class MongooseOtpRepository extends OtpRepository {
  constructor(@InjectModel(Otp.name) readonly model: Model<Otp>) {
    super();
  }

  async findByTokenAndUser(otp: string, user: string): Promise<Otp> {
    if (!isValidObjectId(user)) {
      throw new Error('Invalid userId format');
    }

    const token = await this.model.findOne({
      otp: otp,
      user: new Types.ObjectId(user),
    });
    if (token) {
      return token.toObject<Otp>();
    } else {
      throw new Error(
        'OTP not found for token: ' + token + ' and userId: ' + user,
      );
    }
  }

  async findByUser(userId: string): Promise<Otp | null> {
    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId format');
    }

    const otp = await this.model.findOne({ user: new Types.ObjectId(userId) });
    return otp ? otp.toObject<Otp>() : null;
  }

  async save(otp: Otp): Promise<Otp> {
    const createdOtp = new this.model(otp);
    return createdOtp.save();
  }

  async deleteByUser(userId: string): Promise<void> {
    if (!isValidObjectId(userId)) {
      throw new Error('Invalid userId format');
    }

    await this.model.deleteOne({ user: new Types.ObjectId(userId) });
  }
}
