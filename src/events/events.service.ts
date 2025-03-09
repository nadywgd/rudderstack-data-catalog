import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { EventRepository } from "./events.repository"
import { CreateEventPayload } from "./events.validation"
import { NotFoundError } from "errors/not-found"

export class EventService {
  private eventRepository = new EventRepository()

  public async getEvents(params: PaginatedRequestParams): Promise<PaginatedResponse<Event>> {
    const events = await this.eventRepository.getEvents(params)

    return {
      data: events,
      nextCursor: events.length === params.limit ? { id: events[events.length - 1].id } : null
    }
  }

  public async createEvent(payload: CreateEventPayload): Promise<Event> {
    return this.eventRepository.createEvent(payload)
  }

  public async getEventById(id: number): Promise<Event> {
    const event = this.eventRepository.getEventById(id)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }

  public async updateEvent(id: number, eventData: CreateEventPayload): Promise<Event | null> {
    const event = this.eventRepository.updateEvent(id, eventData)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }

  public async deleteEvent(id: number): Promise<boolean> {
    const event = this.eventRepository.deleteEvent(id)
    if (!event) {
      throw new NotFoundError("Event not found")
    }
    return event
  }
}
