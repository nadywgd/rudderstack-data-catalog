import { DBModel } from "interfaces/db.interface"
import { TrackingPlanPayload } from "./tracking_plans.validation"

export interface TrackingPlan extends DBModel, TrackingPlanPayload {}

