<!-- 高级表格组件 -->
<template>
	<transition :name="transName">
		<div class="boke-table" v-show="tableShow">
			<!-- 列表 头部 操作 -->
			<div class="table-header flex-middle table-header-con">
				<!-- 查询结果 -->
				<span class="h5">
					<slot name="tableTitle"></slot>
				</span>
				<choose-column-menu
					:currentColumns="showColumns"
					:options="columns"
					:teleported="false"
					@submited="transHandle"
				></choose-column-menu>
			</div>
			<div class="table-handle" v-if="slots.tableHandle && selectData.length">
				<div
					>已选中<span class="select-num">{{ selectData.length }}</span
					>项</div
				>
				<slot name="tableHandle"></slot>
			</div>
			<!-- 列表 -->
			<div class="main-table">
				<el-table
					ref="table"
					v-loading="loading"
					:data="list"
					@selectionChange="handleSelectionChange"
					v-bind="$attrs"
				>
					<!-- 渲染每列数据 -->
					<template v-for="column in activeColumns" :key="column.prop">
						<!-- 如果是选择 -->
						<el-table-column
							v-bind="column"
							v-if="column?.type === 'selection' || column.type === 'index'"
							:align="column?.align || 'center'"
						></el-table-column>
						<!-- 如果有折叠 -->
						<el-table-column v-bind="column" v-if="column.type === 'expand'">
							<template #default="scope">
								<!-- 折叠编辑器 -->
								<my-editor
									v-if="column.editor"
									:id="`editor-content-${scope.$index}`"
									:model-value="column?.editor?.formatter(scope.row)"
									v-bind="column.editor"
								>
								</my-editor>
								<!-- 折叠内容 -->
								<slot :name="column.prop" :row="scope.row" v-else></slot>
							</template>
						</el-table-column>
						<!-- 一般情况 -->
						<el-table-column
							v-bind="column"
							v-if="!column.type && column.prop && !column.hideInTable"
							:align="column?.align || 'center'"
						>
							<!-- 如果需要自定义 列的头部 -->
							<template #header v-if="slots[`${column.prop}Header`]">
								<slot :name="`${column.prop}Header`" :row="column"></slot>
							</template>
							<!-- 如果需要自定义 当前列的内容 -->
							<template #default="scope" v-if="slots[column.prop]">
								<slot :name="column.prop" :row="scope.row"></slot>
							</template>
						</el-table-column>
					</template>
					<!-- 如果有折叠 -->
				</el-table>
			</div>
			<!-- 分页组件 -->
			<BokePagination
				v-if="total > pagination.pageSize && pagination.show"
				:total="total"
				:layout="pagination?.layout"
				:page-sizes="pagination?.pageSizes"
				v-model:page="curPage"
				v-model:size="pageSize"
				@pageChange="pageChange"
				@size-change="sizeChange"
			/>
		</div>
	</transition>
</template>
<script setup>
import BokePagination from "./BokePagination.vue"
import ChooseColumnMenu from "@/components/common/choose_column/ChooseColumnMenu.vue"
import MyEditor from "@/components/form/editor/MyEditor.vue"
import { useTableRequest } from "@/hooks/use_table_hook"
import { transitionFunc, transName } from "@/utils/tools/transition.js"
/**
 * requestFunc 请求方法
 * columns 表格列
 * params 请求参数
 * listData 表格初始数据
 * filterTableData 表格数据过滤器
 */
const props = defineProps({
	requestFunc: {
		type: Function,
		default: () => {}
	},
	columns: {
		type: Array,
		default: () => []
	},
	listData: {
		type: Array,
		default: () => {
			return []
		}
	},
	filterTableData: {
		type: Function,
		default: undefined
	},
	filterParams: {
		type: Function,
		default: undefined
	},
	pagination: {
		type: Object,
		default: () => ({
			page: 1,
			pageSize: 10,
			show: true,
			pageSizes: [10, 15, 30, 50, 100]
		})
	},
	mountedDefault: {
		type: Boolean,
		default: true
	}
})
const emits = defineEmits(["pageChange", "sizeChange", "handleSelectionChange"])
// 列表列的配置数据
const { columns, listData, pagination } = toRefs(props)

// 当前组件所有的slot
const slots = useSlots()
const tableShow = ref(true)
const showColumns = ref() // 存放自定义列
// 当前table的Ref 可以导出给外面使用  外面可以利用此ref 使用table相关方法
const table = ref()
const selectData = ref([]) // 表格选中的数据
// useTableRequest 返回列表数据 与 page相关数据可与pagination 绑定 返回字段 都是响应式
let { loadData, list, loading, curPage, pageSize, total } = useTableRequest(
	props.requestFunc,
	pagination.value,
	props.filterTableData,
	props.mountedDefault,
	props.filterParams
)
const activeColumns = computed(() => {
	return columns.value.filter((col) => {
		return showColumns.value?.includes(col.prop)
	})
})
watch(
	props.columns,
	() => {
		showColumns.value = columns.value.map((col) => {
			return (col["value"] = col.prop)
		})
	},
	{
		deep: true,
		immediate: true
	}
)
// 更自定义列展示字段
const handleColumnChoose = (scope) => {
	showColumns.value = scope.selected
}
const transHandle = transitionFunc(handleColumnChoose, tableShow, 300)
const pageChange = (value) => {
	emits("pageChange", value)
	loadData()
}
const handleSelectionChange = (val) => {
	selectData.value = val
	emits("handleSelectionChange", val)
}
const sizeChange = (value) => {
	const { page, size } = value
	curPage.value = page
	emits("sizeChange", value)
	loadData(null, {
		page: page,
		pageSize: size
	})
}
// 刷新列表
const reloadTable = async () => {
	await loadData()
}
onMounted(async () => {
	if (listData?.value) {
		loading.value = false
		list.value = listData.value
	} else {
		await loadData()
	}
})
// 导出给父组件使用的属性
defineExpose({
	table,
	loadData,
	reloadTable
})
</script>

<style scoped lang="scss">
.boke-table {
	display: flex;
	flex-direction: column;
	overflow: visible;
	width: 100%;
	height: 100%;

	.table-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.table-handle {
		margin-bottom: 16px;
		background-color: var(--boke-table-current-row-bg-color);
		padding: 10px 10px 10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.select-num {
			color: var(--boke-color-open);
			padding: 0 2px;
		}
	}
	.main-table {
		overflow: auto;
		height: 100%;
		box-sizing: border-box;
		border-radius: 4px;
	}
}
</style>
