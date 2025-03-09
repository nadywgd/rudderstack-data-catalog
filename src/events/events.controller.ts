import { Controller } from "interfaces/controller.interface"
import { EventService } from "./events.service"
import e, { Request, Response } from "express"
import { request } from "http"

export class EventController extends Controller {
  private eventService = new EventService()

  constructor() {
    super("/events")
    this.initializeRoutes()
  }

  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getEvents),
      this.router.post(`${this.path}`, this.createEvent),
      this.router.get(`${this.path}/:id`, this.getEventById),
      this.router.put(`${this.path}/:id`, this.updateEvent),
      this.router.delete(`${this.path}/:id`, this.deleteEvent)
  }

  private getEvents = async (request: Request, response: Response) => {
    const params = request.query

    const limit = parseInt(params.limit as string, 10)
    const cursor = params.cursor ? parseInt(params.cursor as string, 10) : null

    const events = await this.eventService.getEvents({ limit, cursor })
    response.json(events)
  }

  private createEvent = async (request: Request, response: Response) => {
    const event = await this.eventService.createEvent(request.body)
    response.status(201).json(event)
  }

  private getEventById = async (request: Request, response: Response) => {
    const eventId = parseInt(request.params.id, 10)

    const event = await this.eventService.getEventById(eventId)
    if (event) {
      response.json(event)
    } else {
      response.status(404).json({ message: "Event not Found" })
    }
  }

  private updateEvent = async (request: Request, response: Response) => {
    const eventId = parseInt(request.params.id, 10)
    const eventData = request.body

    const updatedEvent = await this.eventService.updateEvent(eventId, eventData)
    if (updatedEvent) {
      response.json(updatedEvent)
    } else {
      response.status(404).json({ message: "Event not found" })
    }
  }

  private deleteEvent = async (request: Request, response: Response) => {
    const eventId = parseInt(request.params.id, 10)

    const result = await this.eventService.deleteEvent(eventId)
    if (result) {
      response.status(204).send()
    } else {
      response.status(404).json({ message: "Event not found" })
    }
  }
}
