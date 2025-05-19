import { Injectable } from '@nestjs/common';
import { Event } from '../event.entity';
import { EventRepository } from '../event.repository';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(data: Partial<Event>): Promise<Event> {
    return this.eventRepository.create(data);
  }
}
