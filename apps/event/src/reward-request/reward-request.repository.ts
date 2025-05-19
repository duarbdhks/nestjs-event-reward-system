import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardRequest } from './reward-request.entity';

@Injectable()
export class RewardRequestRepository {
  constructor(
    @InjectModel(RewardRequest.name) private readonly rewardRequestModel: Model<RewardRequest>,
  ) {}

  async create(rewardRequest: Partial<RewardRequest>): Promise<RewardRequest> {
    return this.rewardRequestModel.create(rewardRequest);
  }

  async findByEventIdAndUserId(eventId: string, userId: string): Promise<RewardRequest | null> {
    return this.rewardRequestModel.findOne({ eventId, userId }).exec();
  }

  async findByUserId(userId: string): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find({ userId }).exec();
  }

  async findAll(): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find().exec();
  }

  async findById(id: string): Promise<RewardRequest | null> {
    return this.rewardRequestModel.findById(id).exec();
  }

  async updateStatus(
    id: string,
    status: 'GRANTED' | 'REJECTED',
    resultMessage?: string,
  ): Promise<RewardRequest> {
    const rewardRequest = await this.rewardRequestModel.findById(id);
    if (!rewardRequest) {
      throw new NotFoundException(`Reward request with ID ${id} not found`);
    }

    return this.rewardRequestModel
      .findByIdAndUpdate(
        id,
        {
          status,
          resolvedAt: new Date(),
          resultMessage,
        },
        { new: true },
      )
      .exec();
  }
}
