import pool from "config/database"
import { PaginatedRequestParams } from "interfaces/api.interface"
import { QueryResult } from "pg"
import { CreateEventPayload } from "./events.validation"

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

  public async createEvent(event: CreateEventPayload) {
    const result = await pool.query<Event>(
      "INSERT INTO events (name, type, description) VALUES ($1, $2, $3) RETURNING *",
      [event.name, event.type, event.description]
    )
    return result.rows[0]
  }

  public async getEventById(id: number) {
    const result = await pool.query<Event>(
      "SELECT id, name, type, description FROM events WHERE id = $1",
      [id]
    )
    return result.rows[0] || null
  }

  public async updateEvent(id: number, eventData: CreateEventPayload) {
    const result = await pool.query<Event>(
      "UPDATE events SET name = $1, type = $2, description = $3, updated_at= now() WHERE id = $4 RETURNING *",
      [eventData.name, eventData.type, eventData.description, id]
    )
    return result.rows[0] || null
  }

  public async deleteEvent(id: number) {
    const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [id])
    return (result.rowCount ?? 0) > 0
  }
}
