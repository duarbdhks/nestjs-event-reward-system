import { Injectable } from '@nestjs/common';
import { EventRepository } from '../event.repository';
import { Event } from '../event.entity';

@Injectable()
export class CreateEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(data: Partial<Event>): Promise<Event> {
    return this.eventRepository.create(data);
  }
}
