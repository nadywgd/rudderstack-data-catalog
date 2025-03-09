import pool from "config/database"
import { PaginatedRequestParams } from "interfaces/api.interface"
import { QueryResult } from "pg"

export class EventRepository {
  public async getEvents(params: PaginatedRequestParams) {
    let queryPromise: Promise<QueryResult<Event>>

    if (!params.cursor) {
      queryPromise = pool.query<Event>(
        "SELECT id, name, type, description FROM events ORDER BY id ASC LIMIT $1",
        [params.limit]
      )
    } else {
      queryPromise = pool.query<Event>(
        "SELECT id, name, type, description FROM events WHERE id > $1 ORDER BY id ASC LIMIT $2",
        [params.cursor, params.limit]
      )
    }

    const result = await queryPromise
    return result.rows
  }
}
