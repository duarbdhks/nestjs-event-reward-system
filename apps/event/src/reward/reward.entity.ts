import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reward extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: ['POINT', 'ITEM', 'COUPON'] })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
