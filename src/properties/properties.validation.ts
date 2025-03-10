import { z } from "zod"

export const propertiesSchema = z.object({
  body: z.object({
    name: z.string(),
    type: z.enum(["string", "number", "boolean"]),
    description: z.string()
  })
})

export type PropertiesPayload = z.infer<typeof propertiesSchema>["body"]
