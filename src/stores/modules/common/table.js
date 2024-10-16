import { defineStore } from "pinia"
// 数据表加载时，增加过场动画
export const useTableStore = defineStore("tableData", {
	state: () => {
		return {
			loading: false
		}
	},
	actions: {
		// 切换表格数据加载状态
		setLoading(flag) {
			this.loading = flag
		}
	}
})
