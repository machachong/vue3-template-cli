import Tracker from "@/utils/tracking/tracker.js"
export const routeChange = (eventName, title) => {
	return Tracker.push({
		name: eventName,
		description: title,
		behavior: "visit",
		content: "飞书卡片日志",
		version: "2.0"
	})
}
export const demo = {}
