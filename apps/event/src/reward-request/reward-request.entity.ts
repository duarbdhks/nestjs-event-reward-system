import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RewardRequest extends Document {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  eventId: Types.ObjectId;

  @Prop({ required: true, enum: ['PENDING', 'GRANTED', 'REJECTED'] })
  status: string;

  @Prop({ required: true })
  requestedAt: Date;

  @Prop()
  resolvedAt?: Date;

  @Prop()
  resultMessage?: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
