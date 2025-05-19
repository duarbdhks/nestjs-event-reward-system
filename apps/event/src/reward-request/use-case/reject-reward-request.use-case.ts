import { Injectable } from '@nestjs/common';
import { RewardRequestRepository } from '../reward-request.repository';

@Injectable()
export class RejectRewardRequestUseCase {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  async execute(id: string, resultMessage: string) {
    return this.rewardRequestRepository.updateStatus(id, 'REJECTED', resultMessage);
  }
}
