import permission from "@/directives/permission"
import tracking from "@/directives/tracking"
export default (app) => {
	permission(app)
	tracking(app)
}
