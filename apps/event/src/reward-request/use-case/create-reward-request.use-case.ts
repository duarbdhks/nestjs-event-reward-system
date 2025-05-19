import { BadRequestException, Injectable } from '@nestjs/common';
import { RewardRequest } from '../reward-request.entity';
import { RewardRequestRepository } from '../reward-request.repository';

@Injectable()
export class CreateRewardRequestUseCase {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  async execute(data: Partial<RewardRequest>): Promise<RewardRequest> {
    const { userId, eventId } = data;

    const existingRequest = await this.rewardRequestRepository.findByEventIdAndUserId(
      eventId.toString(),
      userId.toString(),
    );
    if (existingRequest) {
      throw new BadRequestException(
        `이미 해당 이벤트에 대한 보상 요청이 존재합니다. (상태: ${existingRequest.status})`,
      );
    }

    const rewardRequest = {
      ...data,
      requestedAt: new Date(),
      status: 'PENDING',
    };
    return this.rewardRequestRepository.create(rewardRequest);
  }
}
