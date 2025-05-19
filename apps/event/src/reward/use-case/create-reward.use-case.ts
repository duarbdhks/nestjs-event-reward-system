import { Injectable } from '@nestjs/common';
import { RewardRepository } from '../reward.repository';
import { Reward } from '../reward.entity';

@Injectable()
export class CreateRewardUseCase {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async execute(data: Partial<Reward>): Promise<Reward> {
    return this.rewardRepository.create(data);
  }
}
