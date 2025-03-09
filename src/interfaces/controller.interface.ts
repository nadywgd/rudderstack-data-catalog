import { Router } from "express"

/**
 * Abstract base class for controllers in the application.
 * This enforces a standard structure for defining controllers.
 */

export abstract class Controller {
  public router: Router

  constructor(protected path: string) {
    this.router = Router()
  }

  protected abstract initializeRoutes(): void
}
