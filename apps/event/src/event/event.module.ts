import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.entity';
import { EventRepository } from './event.repository';
import { CreateEventUseCase } from './use-case/create-event.use-case';
import { FindEventUseCase } from './use-case/find-event.use-case';
import { FindEventsUseCase } from './use-case/find-events.use-case';
import { EventController } from './event.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [EventController],
  providers: [EventRepository, CreateEventUseCase, FindEventUseCase, FindEventsUseCase],
  exports: [EventRepository],
})
export class EventModule {}
