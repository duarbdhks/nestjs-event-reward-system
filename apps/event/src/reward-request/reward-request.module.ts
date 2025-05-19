import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestSchema } from './reward-request.entity';
import { RewardRequestRepository } from './reward-request.repository';
import { RewardRequestController } from './reward-request.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }])],
  controllers: [RewardRequestController],
  providers: [RewardRequestRepository],
  exports: [RewardRequestRepository],
})
export class RewardRequestModule {}
