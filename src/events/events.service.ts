import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { EventRepository } from "./events.repository"
import { EventPayload } from "./events.validation"
import { NotFoundError } from "errors/not-found"
import { Event } from "./events.model"

export class EventService {
  private eventRepository = new EventRepository()

  public async getEvents(params: PaginatedRequestParams): Promise<PaginatedResponse<Event>> {
    const events = await this.eventRepository.getEvents(params)

    return {
      data: events,
      nextCursor: events.length === params.limit ? { id: events[events.length - 1].id } : null
    }
  }

  public async createEvent(payload: EventPayload): Promise<Event> {
    return await this.eventRepository.createEvent(payload)
  }

  public async getEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.getEventById(id)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }

  public async updateEvent(id: number, eventData: EventPayload): Promise<Event | null> {
    const event = await this.eventRepository.updateEvent(id, eventData)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }

  public async deleteEvent(id: number): Promise<boolean> {
    const event = await this.eventRepository.deleteEvent(id)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }
}
