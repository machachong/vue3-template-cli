import { defineStore } from "pinia"
import { getApps } from "@/api/publicApi"
export const useMenuStore = defineStore("menuData", {
	state: () => {
		return {
			menus: []
		}
	},
	actions: {
		async getAllApps() {
			if (this.menus.length > 0) return
			try {
				const items = await getApps("side")
				this.menus = items
			} catch (error) {
				console.log(error)
			}
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: sessionStorage,
				paths: ["menus"]
			}
		]
	}
})
