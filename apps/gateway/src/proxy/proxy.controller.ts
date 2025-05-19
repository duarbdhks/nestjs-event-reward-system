import { Role, Roles } from '@decorator/roles.decorator';
import { RolesGuard } from '@guard/roles.guard';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('auth/register')
  async register(@Body() body: any) {
    return this.proxyService.forwardRequest('auth', 'POST', '/auth/register', body);
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    return this.proxyService.forwardRequest('auth', 'POST', '/auth/login', body);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('auth/profile')
  async getProfile(@Request() req) {
    return this.proxyService.forwardRequest('auth', 'GET', '/auth/profile', null, req.headers);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Post('events')
  async createEvent(@Body() body: any, @Request() req) {
    return this.proxyService.forwardRequest('event', 'POST', '/events', body, req.headers);
  }

  @Get('events')
  async getEvents() {
    return this.proxyService.forwardRequest('event', 'GET', '/events');
  }

  @Get('events/:id')
  async getEvent(@Request() req) {
    return this.proxyService.forwardRequest('event', 'GET', `/events/${req.params.id}`);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN)
  @Post('rewards')
  async createReward(@Body() body: any, @Request() req) {
    return this.proxyService.forwardRequest('event', 'POST', '/rewards', body, req.headers);
  }

  @Get('rewards')
  async getRewards(@Request() req) {
    const eventId = req.query.eventId;
    return this.proxyService.forwardRequest(
      'event',
      'GET',
      `/rewards?eventId=${eventId}`,
      null,
      req.headers,
    );
  }

  @Get('rewards/:id')
  async getReward(@Request() req) {
    return this.proxyService.forwardRequest('event', 'GET', `/rewards/${req.params.id}`);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('rewards/request')
  async createRewardRequest(@Body() body: any, @Request() req) {
    return this.proxyService.forwardRequest('event', 'POST', '/rewards/request', body, req.headers);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('rewards/request/my')
  async getMyRewardRequests(@Request() req) {
    return this.proxyService.forwardRequest(
      'event',
      'GET',
      `/rewards/request/my`,
      null,
      req.headers,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN, Role.AUDITOR)
  @Get('rewards/request/all')
  async getAllRewardRequests(@Request() req) {
    return this.proxyService.forwardRequest(
      'event',
      'GET',
      '/rewards/request/all',
      null,
      req.headers,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.OPERATOR, Role.ADMIN, Role.AUDITOR)
  @Get('rewards/request/:id')
  async getRewardRequest(@Request() req) {
    return this.proxyService.forwardRequest(
      'event',
      'GET',
      `/rewards/request/${req.params.id}`,
      null,
      req.headers,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  @Post('rewards/request/:id/grant')
  async grantReward(@Request() req, @Body() body: { resultMessage?: string }) {
    return this.proxyService.forwardRequest(
      'event',
      'POST',
      `/rewards/request/${req.params.id}/grant`,
      body,
      req.headers,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  @Post('rewards/request/:id/reject')
  async rejectReward(@Request() req, @Body() body: { resultMessage: string }) {
    return this.proxyService.forwardRequest(
      'event',
      'POST',
      `/rewards/request/${req.params.id}/reject`,
      body,
      req.headers,
    );
  }
}
