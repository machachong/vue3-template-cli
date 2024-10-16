import { message } from "@/utils/tools"
import { ref, onMounted } from "vue"
// 表格请求 hook
export const useTableRequest = (
	func,
	pagination,
	filterTableData,
	mountedDefault,
	filterParams
) => {
	const { page, pageSize } = pagination
	const list = ref()
	const loading = ref(false)
	const curPage = ref(page)
	const total = ref(0)
	const size = ref(pageSize)
	const formParms = ref()
	const loadData = async (params, pagination) => {
		// 暴露格式化参数方法
		if (filterParams) {
			params = filterParams(params)
		}
		pagination?.page ? (curPage.value = pagination.page) : null
		pagination?.pageSize ? (size.value = pagination.pageSize) : null
		params ? (formParms.value = params) : null
		loading.value = true
		try {
			const res = await func({
				page: curPage.value,
				size: size.value,
				...formParms.value
			})
			loading.value = false
			if (res?.items && res?.items.length > 0) {
				list.value = res?.items
				if (filterTableData) {
					list.value = filterTableData(list.value)
				}
				total.value = res?.total ?? 0
			} else {
				list.value = []
				total.value = 0
			}
		} catch (error) {
			message.error(error)
			loading.value = false
		}
	}
	// 重置
	const reset = () => {
		loadData()
	}
	onMounted(() => {
		if (mountedDefault) loadData()
	})
	return { loadData, list, loading, total, pageSize, curPage, reset }
}
