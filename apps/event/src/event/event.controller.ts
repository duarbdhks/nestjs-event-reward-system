import { Role, Roles } from '@decorator/roles.decorator';
import { JwtAuthGuard } from '@guard/jwt-auth.guard';
import { RolesGuard } from '@guard/roles.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Event } from './event.entity';
import { CreateEventUseCase } from './use-case/create-event.use-case';
import { FindEventUseCase } from './use-case/find-event.use-case';
import { FindEventsUseCase } from './use-case/find-events.use-case';

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly findEventUseCase: FindEventUseCase,
    private readonly findEventsUseCase: FindEventsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async create(@Body() data: Partial<Event>) {
    return this.createEventUseCase.execute(data);
  }

  @Get()
  async findAll() {
    return this.findEventsUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findEventUseCase.execute(id);
  }
}
