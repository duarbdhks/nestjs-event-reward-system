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

  @UseGuards(AuthGuard, RolesGuard)
  @Get('events')
  async getEvents(@Request() req) {
    return this.proxyService.forwardRequest('event', 'GET', '/events', null, req.headers);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('events/:id')
  async getEvent(@Request() req) {
    return this.proxyService.forwardRequest(
      'event',
      'GET',
      `/events/${req.params.id}`,
      null,
      req.headers,
    );
  }
}
