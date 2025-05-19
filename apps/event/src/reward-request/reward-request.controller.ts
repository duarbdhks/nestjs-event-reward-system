import { Role, Roles } from '@decorator/roles.decorator';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RolesGuard } from '@guard/roles.guard';
import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { RewardRequest } from './reward-request.entity';
import { CreateRewardRequestUseCase } from './use-case/create-reward-request.use-case';
import { FindAllRewardRequestsUseCase } from './use-case/find-all-reward-requests.use-case';
import { FindMyRewardRequestsUseCase } from './use-case/find-my-reward-requests.use-case';
import { FindRewardRequestByIdUseCase } from './use-case/find-reward-request-by-id.use-case';
import { GrantRewardRequestUseCase } from './use-case/grant-reward-request.use-case';
import { RejectRewardRequestUseCase } from './use-case/reject-reward-request.use-case';

@Controller('rewards/request')
export class RewardRequestController {
  constructor(
    private readonly createRewardRequestUseCase: CreateRewardRequestUseCase,
    private readonly findMyRewardRequestsUseCase: FindMyRewardRequestsUseCase,
    private readonly findAllRewardRequestsUseCase: FindAllRewardRequestsUseCase,
    private readonly findRewardRequestByIdUseCase: FindRewardRequestByIdUseCase,
    private readonly grantRewardRequestUseCase: GrantRewardRequestUseCase,
    private readonly rejectRewardRequestUseCase: RejectRewardRequestUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post()
  async create(@Body() data: Partial<RewardRequest>) {
    return this.createRewardRequestUseCase.execute(data);
  }

  @Get('all')
  async findAll() {
    return this.findAllRewardRequestsUseCase.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('my')
  async findByMyRewardRequests(@Request() req) {
    const userId = req.user?.userId;
    return this.findMyRewardRequestsUseCase.execute(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findRewardRequestByIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  @Post(':id/grant')
  async grantReward(@Param('id') id: string, @Body() data: { resultMessage?: string }) {
    return this.grantRewardRequestUseCase.execute(id, data.resultMessage);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  @Post(':id/reject')
  async rejectReward(@Param('id') id: string, @Body() data: { resultMessage: string }) {
    return this.rejectRewardRequestUseCase.execute(id, data.resultMessage);
  }
}
