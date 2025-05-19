import { Role, Roles } from '@decorator/roles.decorator';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RolesGuard } from '@guard/roles.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Reward } from './reward.entity';
import { CreateRewardUseCase } from './use-case/create-reward.use-case';
import { FindRewardUseCase } from './use-case/find-reward.use-case';
import { FindRewardsByEventUseCase } from './use-case/find-rewards-by-event.use-case';

@Controller('rewards')
export class RewardController {
  constructor(
    private readonly createRewardUseCase: CreateRewardUseCase,
    private readonly findRewardUseCase: FindRewardUseCase,
    private readonly findRewardsByEventUseCase: FindRewardsByEventUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async create(@Body() data: Partial<Reward>) {
    return this.createRewardUseCase.execute(data);
  }

  @Get()
  async findByEventId(@Query('eventId') eventId: string) {
    return this.findRewardsByEventUseCase.execute(eventId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findRewardUseCase.execute(id);
  }
}
