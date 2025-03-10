import App from "app"
import { EventController } from "events/events.controller"
import { PropertyController } from "properties/properties.controller"
import { TrackingPlanController } from "tracking_plans/tracking_plans.controller"

const app = new App([new EventController(), new PropertyController(), new TrackingPlanController()])
app.listen()
