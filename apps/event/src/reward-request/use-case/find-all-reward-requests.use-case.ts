import { Injectable } from '@nestjs/common';
import { RewardRequestRepository } from '../reward-request.repository';

@Injectable()
export class FindAllRewardRequestsUseCase {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  async execute() {
    return this.rewardRequestRepository.findAll();
  }
}
