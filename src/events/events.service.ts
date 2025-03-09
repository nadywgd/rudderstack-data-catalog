import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { EventRepository } from "./events.repository"

export class EventService {
  private eventRepository = new EventRepository()

  public async getEvents(params: PaginatedRequestParams): Promise<PaginatedResponse<Event>> {
    const events = await this.eventRepository.getEvents(params)

    return {
      data: events,
      nextCursor: events.length === params.limit ? { id: events[events.length - 1].id } : null
    }
  }
}
