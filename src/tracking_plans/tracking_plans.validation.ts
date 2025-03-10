import { z } from "zod"
import { eventSchema } from "events/events.validation"

export const trackingPlanSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    events: z.array(eventSchema)

  })
})

export type TrackingPlanPayload = z.infer<typeof trackingPlanSchema>["body"]
