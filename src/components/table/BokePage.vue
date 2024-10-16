<!-- 高级页面组件 -->
<template>
	<boke-card :showHeader="true" class="boke-page">
		<template #header>
			<div class="h5 p-b-22" v-if="title">{{ title }}</div>
			<BokeForm
				ref="formRef"
				:form-data="formData"
				:columns="searchColumns"
				:vertical="vertical"
				:rules="rules"
				:label-width="labelWidth"
				v-bind="$attrs.form"
			>
				<template #formFooter>
					<boke-button type="primary" :icon="Search" @click="onSearch"> 筛选 </boke-button>
					<boke-button @click="reset" v-if="form.reset" :icon="Refresh">重置 </boke-button>
				</template>
				<template v-for="itemSlot in formSlots" :key="itemSlot" v-slot:[itemSlot]="row">
					<slot :name="itemSlot" v-bind="row"></slot>
				</template>
			</BokeForm>
		</template>
		<BokeTable
			ref="tableRef"
			border
			:columns="columns"
			:pagination="pagination"
			:request-func="requestFunc"
			:filterParams="filterParams"
			:listData="listData"
			highlight-current-row
			:filterTableData="filterTableData"
			:mountedDefault="false"
			@handleSelectionChange="handleSelectionChange"
			v-bind="$attrs"
		>
			<slot name="tableTitle"></slot>
			<slot name="tableHandle"></slot>
			<template v-for="itemSlot in tableSlots" :key="itemSlot" v-slot:[itemSlot]="row">
				<slot :name="itemSlot" v-bind="row"></slot>
			</template>
		</BokeTable>
	</boke-card>
</template>

<script setup>
import { Search, Refresh } from "@element-plus/icons-vue"
const slots = useSlots()
const formRef = ref()
const tableRef = ref()
let props = defineProps({
	title: {
		type: String,
		default: ""
	},
	labelWidth: {
		type: [String, Number],
		default: "100px"
	}, // 表单label宽度
	vertical: {
		type: Boolean,
		default: false
	}, // 表单排列方向
	formData: {
		type: Object,
		default: () => ({})
	}, // 表单双向绑定的数据
	searchColumns: {
		type: Array,
		default: () => []
	}, // 表单columns
	rules: {
		type: Array,
		default: () => []
	}, // 表单校验规则
	requestFunc: {
		type: Function,
		default: () => {}
	}, //  需要请求的一个方法 外面传入  需返回 PromiseTableResult 类型
	columns: {
		type: Array,
		default: () => []
	}, // 列表每列 字段 属性数组
	listData: {
		type: Array,
		default: () => {
			return []
		}
	}, // 列表数据
	filterTableData: {
		type: Function,
		default: undefined
	}, // 对表格数据进行筛选或插入操作
	filterParams: {
		type: Function,
		default: undefined
	}, // 对搜索参数进行格式化
	pagination: {
		type: Object,
		default: () => ({
			page: 1,
			pageSize: 10,
			show: true
		})
	}, // 分页参数
	mountedDefault: {
		type: Boolean,
		default: true
	}, // 表格初始化是否默认加载数据
	form: {
		type: Object,
		default: () => ({ reset: true })
	} // 传给form的所有参数
})
const emits = defineEmits(["handleSelectionChange"])
// 列表列的配置数据
let {
	formData,
	rules,
	searchColumns,
	requestFunc,
	columns,
	listData,
	pagination,
	filterTableData
} = toRefs(props)
const formSlots = computed(() => {
	return Object.keys(slots).filter((keys) => keys?.includes("form"))
})
const tableSlots = computed(() => {
	return Object.keys(slots).filter((keys) => !keys?.includes("form"))
})

const onSearch = () => {
	let form = formRef.value.form || formRef.value
	const data = {
		...formData.value
	}
	form.validate(async (res) => {
		if (res) {
			tableRef.value.loadData(data, {
				page: 1,
				pageSize: pagination.value.pageSize
			})
		}
	})
}
const handleSelectionChange = (val) => {
	emits("handleSelectionChange", val)
}
//重置
const reset = () => {
	formRef.value.form.resetFields()
}
// 刷新列表
const reloadTable = async () => {
	onSearch()
}
onMounted(() => {
	props.mountedDefault && onSearch()
})
// 导出给父组件使用的属性  需要导出的数据 可在此添加
defineExpose({
	tableRef,
	formRef,
	reloadTable,
	reset
})
</script>

<style scoped lang="scss">
.boke-page {
	min-height: 100%;
	.table-header-con {
		width: 100%;
		justify-content: space-between;
	}
	:deep(.el-card__header) {
		border-bottom: none;
	}
}
</style>
