import { Controller } from "interfaces/controller.interface"
import { EventService } from "./events.service"
import { Request, Response } from "express"

export class EventController extends Controller {
  private eventService = new EventService()

  constructor() {
    super("/events")
    this.initializeRoutes()
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getEvents)
  }

  private getEvents = async (request: Request, response: Response) => {
    const params = request.query

    const limit = parseInt(params.limit as string, 10)
    const cursor = params.cursor ? parseInt(params.cursor as string, 10) : null

    const events = await this.eventService.getEvents({ limit, cursor })
    response.json(events)
  }
}
