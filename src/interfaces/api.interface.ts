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
