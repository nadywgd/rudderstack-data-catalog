import { DBModel } from "interfaces/db.interface"
import { PropertyPayload } from "./properties.validation"

export interface Property extends DBModel, PropertyPayload {}
