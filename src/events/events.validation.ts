import { z } from "zod"

export const createEventSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["track", "identify", "alias", "screen", "page"]),
    description: z.string()
  })
})

export type CreateEventPayload = z.infer<typeof createEventSchema>["body"]
