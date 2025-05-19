import { Injectable } from '@nestjs/common';
import { Reward } from '../reward.entity';
import { RewardRepository } from '../reward.repository';

@Injectable()
export class FindRewardsByEventUseCase {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async execute(eventId: string): Promise<Reward[]> {
    return await this.rewardRepository.findByEventId(eventId);
  }
}
