import { Injectable, NotFoundException } from '@nestjs/common';
import { RewardRequestRepository } from '../reward-request.repository';

@Injectable()
export class FindRewardRequestByIdUseCase {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  async execute(id: string) {
    const rewardRequest = await this.rewardRequestRepository.findById(id);
    if (!rewardRequest) {
      throw new NotFoundException(`Reward request with ID ${id} not found`);
    }
    return rewardRequest;
  }
}
