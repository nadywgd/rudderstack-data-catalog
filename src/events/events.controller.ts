import { Controller } from "interfaces/controller.interface"
import { EventService } from "./events.service"
import { NextFunction, Request, Response } from "express"
import validationMiddleware from "middleware/validation.middleware"
import { eventSchema } from "./events.validation"
import { PaginatedDataRequestSchema } from "interfaces/api.interface"

export class EventController extends Controller {
  private eventService = new EventService()

  constructor() {
    super("/events")
    this.initializeRoutes()
  }

  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(PaginatedDataRequestSchema),
      this.getEvents
    ),
      this.router.post(`${this.path}`, validationMiddleware(eventSchema), this.createEvent),
      this.router.get(`${this.path}/:id`, this.getEventById),
      this.router.put(`${this.path}/:id`, validationMiddleware(eventSchema), this.updateEvent),
      this.router.delete(`${this.path}/:id`, this.deleteEvent)
  }

  private getEvents = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.query
      const limit = parseInt(params.limit as string, 10)
      const cursor = params.cursor ? parseInt(params.cursor as string, 10) : null

      const events = await this.eventService.getEvents({ limit, cursor })
      response.json(events)
    } catch (error) {
      next(error)
    }
  }

  private createEvent = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const event = await this.eventService.createEvent(request.body)
      response.status(201).json(event)
    } catch (error) {
      next(error)
    }
  }

  private getEventById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const eventId = parseInt(request.params.id, 10)

      const event = await this.eventService.getEventById(eventId)
      if (event) {
        response.json(event)
      } else {
        response.status(404).json({ message: "Event not Found" })
      }
    } catch (error) {
      next(error)
    }
  }

  private updateEvent = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const eventId = parseInt(request.params.id, 10)
      const eventData = request.body

      const updatedEvent = await this.eventService.updateEvent(eventId, eventData)
      if (updatedEvent) {
        response.json(updatedEvent)
      } else {
        response.status(404).json({ message: "Event not Found" })
      }
    } catch (error) {
      next(error)
    }
  }

  private deleteEvent = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const eventId = parseInt(request.params.id, 10)

      const result = await this.eventService.deleteEvent(eventId)
      response.status(204).send(result)
    } catch (error) {
      next(error)
    }
  }
}
