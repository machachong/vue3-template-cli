import Tracker from "@/utils/tracking/tracker"

export default (app) => {
	app.directive("tracking", {
		mounted: async (el, binding) => {
			el.addEventListener("click", () => {
				try {
					const trackInfo = binding.value
					console.log(trackInfo)
					Tracker.push({ trackInfo })
				} catch (error) {
					console.log(error)
				}
			})
		}
	})
}
