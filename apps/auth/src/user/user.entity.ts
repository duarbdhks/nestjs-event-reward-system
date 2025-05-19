import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'], default: 'USER' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
