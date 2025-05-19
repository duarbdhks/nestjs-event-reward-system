import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './reward.entity';
import { RewardRepository } from './reward.repository';
import { RewardController } from './reward.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }])],
  controllers: [RewardController],
  providers: [RewardRepository],
  exports: [RewardRepository],
})
export class RewardModule {}
