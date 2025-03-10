import pool from "config/database"
import { PaginatedRequestParams } from "interfaces/api.interface"
import { QueryResult } from "pg"
import { PropertyPayload } from "./properties.validation"
import { Property } from "./properties.model"

export class PropertyRepository {
  public async getProperties(params: PaginatedRequestParams) {
    let queryPromise: Promise<QueryResult<Property>>

    if (!params.cursor) {
      queryPromise = pool.query<Property>(
        "SELECT id, name, type, description FROM properties ORDER BY id ASC LIMIT $1",
        [params.limit]
      )
    } else {
      queryPromise = pool.query<Property>(
        "SELECT id, name, type, description FROM properties WHERE id > $1 ORDER BY id ASC LIMIT $2",
        [params.cursor, params.limit]
      )
    }

    const result = await queryPromise
    return result.rows
  }

  public async createProperty(property: PropertyPayload) {
    const result = await pool.query<Property>(
      "INSERT INTO properties (name, type, description) VALUES ($1, $2, $3) RETURNING *",
      [property.name, property.type, property.description]
    )
    return result.rows[0]
  }

  public async getPropertyById(id: number) {
    const result = await pool.query<Property>(
      "SELECT id, name, type, description FROM properties WHERE id = $1",
      [id]
    )
    return result.rows[0] || null
  }

  public async updateProperty(id: number, propertyData: PropertyPayload) {
    const result = await pool.query<Property>(
      "UPDATE properties SET name = $1, type = $2, description = $3, updated_at= now() WHERE id = $4 RETURNING *",
      [propertyData.name, propertyData.type, propertyData.description, id]
    )
    return result.rows[0] || null
  }

  public async deleteProperty(id: number) {
    const result = await pool.query("DELETE FROM properties WHERE id = $1", [id])
    return (result.rowCount ?? 0) > 0
  }
}
