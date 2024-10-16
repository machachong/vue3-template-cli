import { defineStore } from "pinia"
import { getUserOptionsApi } from "@/api/publicApi"

export const useOptionsStore = defineStore("optionsData", {
	state: () => {
		return {
			userOptions: []
		}
	},
	actions: {
		getUserOptions() {
			if (this.userOptions.length === 0) {
				getUserOptionsApi().then((res) => {
					if (res.data.status_code == 200) {
						this.userOptions = res.data.data.options
					}
				})
			}
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: sessionStorage,
				paths: ["userOptions"]
			}
		]
	}
})
