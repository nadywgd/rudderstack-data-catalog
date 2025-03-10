import App from "app"
import { EventController } from "events/events.controller"
import { PropertyController } from "properties/properties.controller"

const app = new App([new EventController(), new PropertyController()])
app.listen()
