import { DBModel } from "interfaces/db.interface"
import { EventPayload } from "./events.validation"

export interface Event extends DBModel, EventPayload {}
