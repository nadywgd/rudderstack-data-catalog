// Class to represent a 400 Bad Request error
import { HttpError } from "./http.error"

export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super(400, message || "Bad Request")
  }
}
