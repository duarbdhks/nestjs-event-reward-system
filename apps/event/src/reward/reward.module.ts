import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardController } from './reward.controller';
import { Reward, RewardSchema } from './reward.entity';
import { RewardRepository } from './reward.repository';
import { CreateRewardUseCase } from './use-case/create-reward.use-case';
import { FindRewardUseCase } from './use-case/find-reward.use-case';
import { FindRewardsByEventUseCase } from './use-case/find-rewards-by-event.use-case';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }])],
  controllers: [RewardController],
  providers: [RewardRepository, CreateRewardUseCase, FindRewardUseCase, FindRewardsByEventUseCase],
  exports: [RewardRepository],
})
export class RewardModule {}
