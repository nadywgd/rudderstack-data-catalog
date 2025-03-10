import { z } from "zod"

export const propertySchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["string", "number", "boolean"]),
    description: z.string()
  })
})

export type PropertyPayload = z.infer<typeof propertySchema>["body"]
