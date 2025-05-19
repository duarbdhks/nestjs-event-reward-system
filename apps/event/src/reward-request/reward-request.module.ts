import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestController } from './reward-request.controller';
import { RewardRequest, RewardRequestSchema } from './reward-request.entity';
import { RewardRequestRepository } from './reward-request.repository';
import { CreateRewardRequestUseCase } from './use-case/create-reward-request.use-case';
import { FindAllRewardRequestsUseCase } from './use-case/find-all-reward-requests.use-case';
import { FindMyRewardRequestsUseCase } from './use-case/find-my-reward-requests.use-case';
import { FindRewardRequestByIdUseCase } from './use-case/find-reward-request-by-id.use-case';
import { GrantRewardRequestUseCase } from './use-case/grant-reward-request.use-case';
import { RejectRewardRequestUseCase } from './use-case/reject-reward-request.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }])],
  controllers: [RewardRequestController],
  providers: [
    RewardRequestRepository,
    CreateRewardRequestUseCase,
    FindMyRewardRequestsUseCase,
    FindAllRewardRequestsUseCase,
    FindRewardRequestByIdUseCase,
    GrantRewardRequestUseCase,
    RejectRewardRequestUseCase,
  ],
  exports: [RewardRequestRepository],
})
export class RewardRequestModule {}
