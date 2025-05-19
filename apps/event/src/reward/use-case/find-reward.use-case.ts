import { Injectable, NotFoundException } from '@nestjs/common';
import { RewardRepository } from '../reward.repository';
import { Reward } from '../reward.entity';

@Injectable()
export class FindRewardUseCase {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async execute(id: string): Promise<Reward> {
    const reward = await this.rewardRepository.findById(id);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }
}
