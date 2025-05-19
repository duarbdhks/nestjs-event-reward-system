import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRepository } from '../event.repository';
import { Event } from '../event.entity';

@Injectable()
export class FindEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(id: string): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }
}
