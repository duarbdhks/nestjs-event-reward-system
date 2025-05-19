import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateEventUseCase } from './use-case/create-event.use-case';
import { FindEventUseCase } from './use-case/find-event.use-case';
import { FindEventsUseCase } from './use-case/find-events.use-case';
import { Event } from './event.entity';

@Controller('events')
export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly findEventUseCase: FindEventUseCase,
    private readonly findEventsUseCase: FindEventsUseCase,
  ) {}

  @Post()
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
