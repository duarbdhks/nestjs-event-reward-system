import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './reward.entity';

@Injectable()
export class RewardRepository {
  constructor(@InjectModel(Reward.name) private readonly rewardModel: Model<Reward>) {}

  async create(reward: Partial<Reward>): Promise<Reward> {
    return this.rewardModel.create(reward);
  }

  async findByEventId(eventId: string): Promise<Reward[]> {
    return await this.rewardModel.find({ eventId }).exec();
  }

  async findById(id: string): Promise<Reward | null> {
    return this.rewardModel.findById(id).exec();
  }
}
