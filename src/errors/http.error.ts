// Abstract class to represent an HTTP error with a status code and messagea
export abstract class HttpError extends Error {
  status: number
  message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}
