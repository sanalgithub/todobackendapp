import { BaseModel } from '@app/common/database/model/base.model';
import { User } from '@app/user/model/user.model';
import { Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Otp extends BaseModel {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    nullable: true,
  })
  user!: User;

  @Prop({ unique: true })
  otp!: string;

  @Prop()
  expiryTime!: Date;

  constructor(otp: Partial<Otp>) {
    super();
    Object.assign(this, otp);
  }
}
