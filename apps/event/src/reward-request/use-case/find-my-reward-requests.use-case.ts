import { Injectable } from '@nestjs/common';
import { RewardRequestRepository } from '../reward-request.repository';

@Injectable()
export class FindMyRewardRequestsUseCase {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  async execute(userId: string) {
    return this.rewardRequestRepository.findByUserId(userId);
  }
}
