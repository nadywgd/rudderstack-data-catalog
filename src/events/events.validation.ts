import { propertySchema } from "properties/properties.validation"
import { z } from "zod"

export const eventSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["track", "identify", "alias", "screen", "page"]),
    description: z.string(),
    properties: z
      .array(
        propertySchema.shape.body.extend({
          required: z.boolean()
        })
      )
      .optional(),
    additionalProperties: z.boolean().optional()
  })
})

export type EventPayload = z.infer<typeof eventSchema>["body"]
