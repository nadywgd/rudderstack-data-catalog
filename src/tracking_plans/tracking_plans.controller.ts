import { Controller } from "interfaces/controller.interface"
import { TrackingPlanService } from "./tracking_plans.service"
import { NextFunction, Request, Response } from "express"
import validationMiddleware from "middleware/validation.middleware"
import { PaginatedDataRequestSchema } from "interfaces/api.interface"

export class TrackingPlanController extends Controller {
  private trackingPlanService = new TrackingPlanService()

  constructor() {
    super("/tracking_plans")
    this.initializeRoutes()
  }

  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(PaginatedDataRequestSchema),
      this.getTrackingPlans
    )
  }

  private getTrackingPlans = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.query
      const limit = parseInt(params.limit as string, 10)
      const cursor = params.cursor ? parseInt(params.cursor as string, 10) : null

      const properties = await this.trackingPlanService.getTrackingPlans({ limit, cursor })
      response.json(properties)
    } catch (error) {
      next(error)
    }
  }
}
