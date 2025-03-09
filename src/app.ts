import express from "express"
import { env } from "config/env"
class App {
  private app: express.Application

  constructor() {
    this.app = express()
  }

  public listen() {
    this.app.listen(env.PORT, () => {
      console.log(`App listening on the port ${env.PORT}`)
    })
  }
}

export default App
