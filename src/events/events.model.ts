import { DBModel } from "interfaces/db.interface"
import { CreateEventPayload } from "./events.validation"

export interface Event extends DBModel, CreateEventPayload {}
