import { z } from "zod"

export const eventSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["track", "identify", "alias", "screen", "page"]),
    description: z.string()
  })
})

export type CreateEventPayload = z.infer<typeof eventSchema>["body"]

export const PaginatedEventsRequestSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a positive integer")
      .transform(Number)
      .refine((value) => value > 0, "Limit must be greater than 0"),
    cursor: z
      .string()
      .regex(/^\d+$/, "Cursor must be a positive integer")
      .transform(Number)
      .optional()
      .nullable()
  })
})
