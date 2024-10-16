<template>
	<BokePage
		ref="bookPage"
		border
		highlight-current-row
		title="服务器命令日志"
		labelWidth="100px"
		:searchColumns="formColumns"
		:form-data="formModel"
		:requestFunc="getList"
		:columns="tablColumns"
		:filterParams="filterParams"
		:pagination="{ pageSize: 15, show: true }"
		:mountedDefault="false"
		@sort-change="sortChange"
		@expand-change="handleExpand"
	>
		<template #formUser>
			<BokeSelect v-model="formModel.account_name" :options="user_list" clearable> </BokeSelect>
		</template>
	</BokePage>
</template>
<script setup>
import dayjs from "dayjs"

import { getSessionFullLogApi } from "./service/larkCardApi"
import { timeShortcuts } from "@/utils/tools/date.js"
import { tablColumns } from "./service/config"

const bookPage = ref()
const user_list = ref([
	{
		value: "1",
		label: "选项1"
	}
])
const getDate = () => {
	const date = new Date()
	const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
	const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
	startOfDay.setTime(startOfDay.getTime() - 3600 * 1000 * 24 * 7)
	endOfDay.setTime(endOfDay.getTime() - 3600 * 1000 * 24 * 1)
	return [
		dayjs(startOfDay).format("YYYY-MM-DD HH:mm:ss"),
		dayjs(endOfDay).format("YYYY-MM-DD HH:mm:ss")
	]
}
const formModel = reactive({
	date: null,
	account_name: null,
	host_name: null
})
formModel.date = getDate()
// 数据源
const formColumns = computed(() => {
	return [
		{
			label: "堡垒机用户",
			prop: "user_name",
			formProp: {
				width: "300",
				slot: "formUser"
			}
		},
		{
			label: "资产名称",
			prop: "host_name",
			formProp: {
				// width: '300',
				el: ElSelect,
				filterable: true,
				childEl: ElOption,
				source: [
					{
						value: "1",
						label: "选项1"
					}
				],
				clearable: true
			}
		},
		{
			label: "日期范围",
			prop: "date",
			type: "datetimerange",
			formProp: {
				width: "480",
				el: ElDatePicker,
				type: "datetimerange",
				"start-placeholder": "开始时间",
				"end-placeholder": "结束时间",
				shortcuts: timeShortcuts,
				"value-format": "YYYY-MM-DD HH:mm:ss"
			}
		}
		// {
		//   label: '',
		//   prop: 'submit',
		//   width: 160,
		//   formProp: {
		//     slot: 'formSubmit'
		//   }
		// }
	]
})
const filterParams = (params) => {
	if (!params) return params
	const { date } = params
	let begin_time,
		end_time = undefined
	if (date) {
		;[begin_time, end_time] = date
	}
	delete params.date
	console.log({
		begin_time,
		end_time,
		...params
	})
	return {
		begin_time,
		end_time,
		...params
	}
}
const getList = (params) => {
	return getSessionFullLogApi(params)
}
const sortChange = ({ order, prop }) => {
	if (order === "ascending") order = "asc"
	if (order === "descending") order = "desc"
	const params = filterParams({
		...formModel,
		sort_by: prop,
		sort_order: order
	})
	bookPage.value.tableRef.loadData(params, { page: 1 })
}
onMounted(() => {})
</script>
<style lang="scss"></style>
