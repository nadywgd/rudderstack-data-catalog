import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { EventRepository } from "./events.repository"
import { CreateEventPayload } from "./events.validation"

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
    return this.eventRepository.getEventById(id)
  }

  public async updateEvent(id: number, eventData: CreateEventPayload): Promise<Event | null> {
    return this.eventRepository.updateEvent(id, eventData)
  }

  public async deleteEvent(id: number): Promise<boolean> {
    return this.eventRepository.deleteEvent(id)
  }
}
