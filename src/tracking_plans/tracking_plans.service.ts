import { PaginatedRequestParams, PaginatedResponse } from "interfaces/api.interface"
import { TrackingPlanRepository } from "./tracking_plans.repository"
import { TrackingPlan } from "./tracking_plans.model"
import { EventRepository } from "events/events.repository"

export class TrackingPlanService {
  private trackingPlanRepository = new TrackingPlanRepository()
  private eventRepository = new EventRepository()

  public async getTrackingPlans(
    params: PaginatedRequestParams
  ): Promise<PaginatedResponse<TrackingPlan>> {
    const trackingPlans = await this.trackingPlanRepository.getTrackingPlans(params)

    const trackingPlansWithEvents = await Promise.all(
      trackingPlans.map(async (trackingPlan) => {
        const events = await this.eventRepository.getEventsByTrackingPlanId(trackingPlan.id)

        return {
          ...trackingPlan,
          events
        }
      })
    )

    return {
      data: trackingPlansWithEvents,
      nextCursor:
        trackingPlans.length === params.limit
          ? { id: trackingPlans[trackingPlans.length - 1].id }
          : null
    }
  }
}
