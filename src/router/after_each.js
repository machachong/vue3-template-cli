import { routeChange } from "@/utils/tracking"

export default function (to) {
	if (to.meta) {
		const meta = to.meta
		if (meta.eventName) {
			routeChange(meta.eventName, meta.module || meta.title)
		}
	}
}
