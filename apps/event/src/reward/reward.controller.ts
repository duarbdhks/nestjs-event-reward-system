import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RewardRepository } from './reward.repository';
import { Reward } from './reward.entity';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardRepository: RewardRepository) {}

  @Post()
  async create(@Body() data: Partial<Reward>) {
    return this.rewardRepository.create(data);
  }

  @Get()
  async findByEventId(@Query('eventId') eventId: string) {
    return this.rewardRepository.findByEventId(eventId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rewardRepository.findById(id);
  }
}
