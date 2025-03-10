import pool from "config/database"
import { PaginatedRequestParams } from "interfaces/api.interface"
import { QueryResult } from "pg"
import { TrackingPlan } from "./tracking_plans.model"

export class TrackingPlanRepository {
  public async getTrackingPlans(params: PaginatedRequestParams) {
    let queryPromise: Promise<QueryResult<TrackingPlan>>

    if (!params.cursor) {
      queryPromise = pool.query(
        "SELECT id, name, description FROM tracking_plans ORDER BY id ASC LIMIT $1",
        [params.limit]
      )
    } else {
      queryPromise = pool.query(
        "SELECT id, name, description FROM tracking_plans WHERE id > $1 ORDER BY id ASC LIMIT $2 ",
        [params.cursor, params.limit]
      )
    }

    const result = await queryPromise
    return result.rows
  }
}
