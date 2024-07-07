import { BaseModel } from '@app/common/database/model/base.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({})
export class User extends BaseModel {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
