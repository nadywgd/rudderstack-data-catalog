import express from "express"
import { env } from "config/env"
import { Controller } from "interfaces/controller.interface"
import { initializeDatabase } from "db/setup"
import errorMiddleware from "middleware/error.middleware"
class App {
  private app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()
    this.app.use(express.json())


    initializeDatabase()

    this.initializeControllers(controllers)
    this.initializeMiddlewares()
  }

  private initializeMiddlewares() {
    this.app.use(errorMiddleware)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router)
    })
  }

  public listen() {
    this.app.listen(env.PORT, () => {
      console.log(`App listening on the port ${env.PORT}`)
    })
  }
}

export default App
