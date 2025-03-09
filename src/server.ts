import App from "app"
import { EventController } from "events/events.controller"

const app = new App([new EventController()])
app.listen()
