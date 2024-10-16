import { defineStore } from "pinia"
import { getUserInfoApi } from "@/api/publicApi"

export const useUserStore = defineStore("userData", {
	state: () => {
		return {
			userInfo: {
				real_name: null
			},
			userOptions: []
		}
	},
	actions: {
		// 获取当前登录用户信息
		getUserInfo() {
			return new Promise((resolve, reject) => {
				if (!this.userInfo.real_name) {
					getUserInfoApi()
						.then((res) => {
							this.userInfo = res.user_info
							resolve()
						})
						.catch((error) => {
							reject(error)
						})
				}
			})
		}
	},
	persist: {
		enabled: false,
		strategies: [
			{
				storage: sessionStorage,
				paths: ["userInfo"]
			}
		]
	}
})
