import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RewardRequest } from './reward-request.entity';

@Injectable()
export class RewardRequestRepository {
  constructor(
    @InjectModel(RewardRequest.name) private readonly rewardRequestModel: Model<RewardRequest>,
  ) {}

  async create(rewardRequest: Partial<RewardRequest>): Promise<RewardRequest> {
    return this.rewardRequestModel.create(rewardRequest);
  }

  async findByUserId(userId: string): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findAll(): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find().exec();
  }

  async findById(id: string): Promise<RewardRequest | null> {
    return this.rewardRequestModel.findById(id).exec();
  }
}
