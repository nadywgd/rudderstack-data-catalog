import { z } from "zod"

export const eventSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["track", "identify", "alias", "screen", "page"]),
    description: z.string()
  })
})

export type EventPayload = z.infer<typeof eventSchema>["body"]
