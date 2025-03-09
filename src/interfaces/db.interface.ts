/**
 * Interface representing a generic database model.
 * This can be extended by other interfaces to ensure consistency
 * across database entities.
 */

export interface DBModel {
  id: number
  created_at: Date
  updated_at: Date
}
