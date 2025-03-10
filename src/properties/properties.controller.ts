import { Controller } from "interfaces/controller.interface"
import { PropertyService } from "./properties.service"
import { NextFunction, Request, Response } from "express"
import validationMiddleware from "middleware/validation.middleware"
import { propertySchema } from "./properties.validation"
import { PaginatedDataRequestSchema } from "interfaces/api.interface"

export class PropertyController extends Controller {
  private propertyService = new PropertyService()

  constructor() {
    super("/properties")
    this.initializeRoutes()
  }

  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(PaginatedDataRequestSchema),
      this.getProperties
    ),
      this.router.post(`${this.path}`, validationMiddleware(propertySchema), this.createProperty),
      this.router.get(`${this.path}/:id`, this.getPropertyById),
      this.router.put(
        `${this.path}/:id`,
        validationMiddleware(propertySchema),
        this.updateProperty
      ),
      this.router.delete(`${this.path}/:id`, this.deleteProperty)
  }

  private getProperties = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.query
      const limit = parseInt(params.limit as string, 10)
      const cursor = params.cursor ? parseInt(params.cursor as string, 10) : null

      const properties = await this.propertyService.getProperties({ limit, cursor })
      response.json(properties)
    } catch (error) {
      next(error)
    }
  }

  private createProperty = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const property = await this.propertyService.createProperty(request.body)
      response.status(201).json(property)
    } catch (error) {
      next(error)
    }
  }

  private getPropertyById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const propertyId = parseInt(request.params.id, 10)

      const property = await this.propertyService.getPropertyById(propertyId)
      if (property) {
        response.json(property)
      } else {
        response.status(404).json({ message: "Property not Found" })
      }
    } catch (error) {
      next(error)
    }
  }

  private updateProperty = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const propertyId = parseInt(request.params.id, 10)
      const propertyData = request.body

      const updatedProperty = await this.propertyService.updateProperty(propertyId, propertyData)
      if (updatedProperty) {
        response.json(updatedProperty)
      } else {
        response.status(404).json({ message: "Property not Found" })
      }
    } catch (error) {
      next(error)
    }
  }

  private deleteProperty = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const propertyId = parseInt(request.params.id, 10)

      const result = await this.propertyService.deleteProperty(propertyId)
      response.status(204).send(result)
    } catch (error) {
      next(error)
    }
  }
}
