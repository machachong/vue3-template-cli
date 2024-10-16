import { defineStore } from "pinia"

export const useKeepliveStore = defineStore("keeplive", {
	state: () => {
		return {
			keepLiveRoute: [] // 缓存的路由
		}
	},
	actions: {
		addAlive(name) {
			const index = this.keepLiveRoute.indexOf(name)
			if (index < 0) {
				this.keepLiveRoute.push(name)
			}
		},
		removeAlive(name) {
			const index = this.keepLiveRoute.indexOf(name)
			if (index >= 0) {
				// 删除
				this.keepLiveRoute = this.keepLiveRoute.filter((item) => item != name)
			}
		},
		clearAlive() {
			this.keepLiveRoute = []
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: sessionStorage,
				paths: ["keepLiveRoute"]
			}
		]
	}
})
