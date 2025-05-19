import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RewardRequestRepository } from './reward-request.repository';
import { RewardRequest } from './reward-request.entity';

@Controller('rewards/request')
export class RewardRequestController {
  constructor(private readonly rewardRequestRepository: RewardRequestRepository) {}

  @Post()
  async create(@Body() data: Partial<RewardRequest>) {
    return this.rewardRequestRepository.create(data);
  }

  @Get()
  async findByUserId(@Query('userId') userId: string) {
    return this.rewardRequestRepository.findByUserId(userId);
  }

  @Get('all')
  async findAll() {
    return this.rewardRequestRepository.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rewardRequestRepository.findById(id);
  }
}
