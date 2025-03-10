import z from "zod"
/**
 * Generic interface for a paginated API response.
 * @template T - The type of data returned in the response.
 */

export interface PaginatedResponse<T> {
  data: T[]
  nextCursor: {
    id: number
  } | null
}

/**
 * Interface for pagination request parameters.
 * Defines how clients request paginated data from the API.
 */
export interface PaginatedRequestParams {
  limit: number
  cursor?: number | null
}

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
