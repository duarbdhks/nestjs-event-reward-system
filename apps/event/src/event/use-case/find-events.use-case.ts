import { Injectable } from '@nestjs/common';
import { EventRepository } from '../event.repository';
import { Event } from '../event.entity';

@Injectable()
export class FindEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }
}
