import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from './event.entity';

@Injectable()
export class EventRepository {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

  async create(event: Partial<Event>): Promise<Event> {
    const eventData = {
      ...event,
      createdBy: new Types.ObjectId(event.createdBy),
    };
    return this.eventModel.create(eventData);
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findById(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }
}
