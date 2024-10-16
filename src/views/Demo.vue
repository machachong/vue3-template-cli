<template>
	<div
		><el-button
			type="primary"
			v-tracking="{
				auth_id: '10101',
				name: 'sql_format',
				description: '美化SQL',
				behavior: 'click',
				version: '2.0',
				obj: { sql: 'SELECT * FROM user' }
			}"
			>这个按钮是boke-button</el-button
		>
	</div>
	<el-space>
		<BokeTextStatus>成功</BokeTextStatus>
		<BokeTextStatus status="fail">失败</BokeTextStatus>
		<BokeTextStatus status="warning">警告</BokeTextStatus>
		<BokeTextStatus mode="text">成功</BokeTextStatus>
		<BokeTextStatus mode="text" status="fail">失败</BokeTextStatus>
		<BokeTextStatus mode="text" status="warning">赞停</BokeTextStatus>
		<BokeTextStatus mode="text" status="open">开启</BokeTextStatus>
	</el-space>
	<br />
	<!-- 二次确认弹窗 -->
	<div class="h5 m-t-10">消息提示,确认</div>
	<el-space>
		<el-button @click="open">消息提示</el-button>
		<el-button @click="openCon">弹窗确认</el-button>
		<BokePopconfirm title="二次确认一下" @confirm="confirmFan" @cancel="cancel">
			<el-button>二次确认</el-button>
		</BokePopconfirm>
	</el-space>
	<div class="h5 m-t-10">svg图标使用</div>
	<el-space>
		<BokeSvg name="up" size="18"></BokeSvg>
		<BokeSvg name="Vector"></BokeSvg>
		<BokeSvg name="Vector" color="red"></BokeSvg>
		<BokeSvg name="Vector" size="30"></BokeSvg>
	</el-space>
	<div class="h5 m-t-10">iconfont</div>
	<i class="iconfont icon-liebiaosousuo"></i>
	<i class="iconfont">&#xe624;</i>
	<div class="h5 m-t-10" @click="showDialog = true">弹窗</div>
	<el-button @click="popup.drawerVisible = true">抽屉</el-button>
	<el-button @click="showDialog = true">对话框</el-button>
	<boke-drawer v-model:value="popup.drawerVisible" title="抽屉标题">
		这是弹窗内容
		<template #footer>
			<el-button>确定</el-button>
		</template>
	</boke-drawer>
	<el-divider></el-divider>
	<BokePage
		ref="bookPage"
		title="demo页面"
		border
		highlight-current-row
		label-width="110px"
		:searchColumns="formColumns"
		:rules="rules"
		:form-data="formModel"
		:requestFunc="getList"
		:columns="asycColumns"
		:mountedDefault="true"
		row-key="id"
		@sort-change="sortChange"
		@current-change="handleCurrentChange"
		@page-change="pageChange"
		@handleSelectionChange="handleSelectionChange"
	>
		<template #tableTitle>
			<el-tabs v-model="activeTabs" class="boke-tabs-small" @tab-change="changeTab">
				<el-tab-pane label="任务列表" name="1"> </el-tab-pane>
				<el-tab-pane label="草稿箱" name="2"></el-tab-pane>
			</el-tabs>
		</template>
		<template #tableHandle>
			<el-space>
				<el-button type="danger" @click="deleteMul">批量删除</el-button>
			</el-space>
		</template>

		<template #expand> 展开的内容 </template>
		<template #formComponent>
			<el-tree-select
				style="width: 100%"
				v-model="treeValue"
				:data="treeData"
				:render-after-expand="false"
			/>
		</template>
		<template #switch="{ row }">
			<el-switch v-model="row.switch"></el-switch>
		</template>
		<template #statusStr="{ row }">
			<BokeTextStatus v-if="row.statusStr === '2'">成功</BokeTextStatus>
			<BokeTextStatus v-if="row.statusStr === '1'" status="fail">失败</BokeTextStatus>
		</template>
		<template #handle>
			<el-space spacer="|">
				<el-link type="primary" @click="showDialog = true" link>表单demo</el-link>
				<el-link type="primary" link @click="showMd = true">表格demo</el-link>
				<el-link disabled>禁用样式</el-link>
			</el-space>
		</template>
		<!-- <template #tableHeader>
			<div>这是一个自定义内容区</div>
		</template> -->
	</BokePage>
	<BokeDialog title="弹窗表单" v-model:value="showDialog" :append-to-body="true">
		<BokeForm
			ref="formRef"
			:columns="formColumns"
			:form-data="formModel"
			:rules="rules"
			label-width="130px"
		>
			<template #formComponent>
				<el-tree-select
					style="width: 100%"
					v-model="treeValue"
					:data="treeData"
					:render-after-expand="false"
				/>
			</template>
		</BokeForm>
		<template #footer>
			<el-row justify="center">
				<el-space>
					<el-button type="primary" @click="onSubmit">确认</el-button>
					<el-button @click="showDialog = false">取消</el-button>
				</el-space>
			</el-row>
		</template>
	</BokeDialog>
	<BokeDialog title="表格demo" v-model:value="showMd" :append-to-body="true">
		<boke-table
			border
			row-key="id"
			highlight-current-row
			:requestFunc="getList"
			:columns="columns"
			:mountedDefault="true"
			@sort-change="sortChange"
			@current-change="handleCurrentChange"
			@page-change="pageChange"
			@handleSelectionChange="handleSelectionChange"
		>
			<template #tableTitle>
				<el-tabs v-model="activeTabs" class="boke-tabs-small" @tab-change="changeTab">
					<el-tab-pane label="任务列表" name="1"> </el-tab-pane>
					<el-tab-pane label="草稿箱" name="2"></el-tab-pane>
				</el-tabs>
			</template>
			<template #tableHandle> <el-button type="danger">批量删除</el-button> </template>
		</boke-table>
	</BokeDialog>
	<BokeDetail title="新增需求" back="/demand/demandmanage/demandlist"> 详情页面组件 </BokeDetail>
</template>

<script setup>
import { message, confirm } from "@/utils/tools"
import BokePage from "@/components/table/BokePage.vue"
import BokeForm from "@/components/form/BokeForm.vue"
import { ElCheckboxGroup, ElRadioGroup } from "element-plus"
import BokeTable from "@/components/table/BokeTable.vue"

const popup = reactive({
	drawerVisible: false
})
const open = () => {
	message.success("This is a message", "Title")
}
const openCon = () => {
	confirm("弹窗确认一下")
		.then(() => {
			console.log("确认")
		})
		.catch(() => {
			console.log("取消")
		})
}
const confirmFan = () => {
	console.log("确认")
}
const cancel = () => {
	console.log("取消")
}
const activeTabs = ref("1")
const sourceData = ref([])
const showDialog = ref(false)
const showMd = ref(false)
const bookPage = ref()
const state = reactive({
	formModel: {
		phone: 17621732566
	},
	formRef: {}
})
// 数据源
const columns = ref([
	{
		label: "序号",
		prop: "id",
		type: "selection",
		width: 100,
		fixed: "left"
	},
	{
		label: "输入框",
		prop: "name",
		width: 150,
		sortable: true,
		formProp: {
			required: false,
			el: ElInput
		}
	},
	{
		label: "手机号必填",
		prop: "phone",
		width: 150,
		formProp: {
			required: true,
			el: ElInput
		}
	},
	{
		label: "单选",
		prop: "radio",
		width: 150,
		formProp: {
			el: ElRadioGroup,
			childEl: ElRadio,
			source: sourceData
		}
	},
	{
		label: "开关",
		prop: "switch",
		width: 150,
		formProp: {
			el: ElSwitch
		}
	},
	{
		label: "复选",
		prop: "checkbox",
		width: 150,
		formProp: {
			el: ElCheckboxGroup,
			childEl: ElCheckbox,
			source: sourceData
		}
	},
	{
		label: "状态",
		prop: "statusStr",
		formProp: {
			filterable: true,
			multiple: true,
			el: ElSelect,
			key: "status",
			childEl: ElOption,
			source: sourceData,
			clearable: true
		}
	},
	{
		label: "日期",
		prop: "date2",
		width: 150,
		formProp: {
			el: ElDatePicker,
			"value-format": "YYYY-MM-DD"
		}
	},
	{
		label: "展开",
		prop: "expand",
		width: 500,
		type: "expand",
		formProp: {}
	},
	{
		label: "自定义组件",
		prop: "custom",
		width: 150,
		formProp: {
			slot: "formComponent",
			clearable: true
		}
	},
	{
		label: "操作",
		prop: "handle",
		fixed: "right",
		width: 260
	}
])
const asycColumns = ref(columns.value)
const formColumns = ref([
	...columns.value.filter((item) => !!item.formProp),
	{
		label: "",
		prop: "submit",
		width: 160,
		formProp: {
			slot: "formSubmit"
		}
	}
])
const changeTab = () => {
	console.log(111, activeTabs.value)
	if (activeTabs.value === "2") {
		asycColumns.value = columns.value.filter((item, index) => index < 8)
	} else {
		asycColumns.value = columns.value
	}
	console.log(asycColumns)
}
console.log(formColumns.value)
const multipleSelection = ref()
const treeValue = ref()
const treeData = [
	{
		value: "1",
		label: "Level one 1",
		children: [
			{
				value: "1-1",
				label: "Level two 1-1",
				children: [
					{
						value: "1-1-1",
						label: "Level three 1-1-1"
					}
				]
			}
		]
	},
	{
		value: "2",
		label: "Level one 2",
		children: [
			{
				value: "2-1",
				label: "Level two 2-1",
				children: [
					{
						value: "2-1-1",
						label: "Level three 2-1-1"
					}
				]
			},
			{
				value: "2-2",
				label: "Level two 2-2",
				children: [
					{
						value: "2-2-1",
						label: "Level three 2-2-1"
					}
				]
			}
		]
	},
	{
		value: "3",
		label: "Level one 3",
		children: [
			{
				value: "3-1",
				label: "Level two 3-1",
				children: [
					{
						value: "3-1-1",
						label: "Level three 3-1-1"
					}
				]
			},
			{
				value: "3-2",
				label: "Level two 3-2",
				children: [
					{
						value: "3-2-1",
						label: "Level three 3-2-1"
					}
				]
			}
		]
	}
]
const { formModel, formRef } = toRefs(state)
const sortChange = (val) => {
	console.log(val)
}
const pageChange = (val) => {
	console.log(val)
}
const handleCurrentChange = (val) => {
	console.log(val)
}
const handleSelectionChange = (val) => {
	console.log(11, val)
	multipleSelection.value = val
}
// 新增表单的配置项 与 校验规则
const rules = ref({})
const checkMobile = (rule, value, callback) => {
	if (!value) {
		callback(new Error("请输入手机号"))
	}
	const regMobile = /^1[3-9]\d{9}$/
	if (regMobile.test(value)) {
		return callback()
	}
	callback(new Error("请输入合法的手机号"))
}
formColumns.value.forEach((item) => {
	if (item.prop === "phone") {
		rules.value[item.formProp.key || item.prop] = [
			{
				validator: checkMobile,
				trigger: "blur"
			}
		]
	} else {
		rules.value[item.formProp.key || item.prop] = [
			{
				required: item.formProp.required,
				message: item.formProp.el === "input" ? `请输入${item.label}` : `请选择${item.label}`,
				trigger: "blur"
			}
		]
	}
})
const deleteMul = () => {
	confirm(`确认删除${multipleSelection.value.map((item) => item.id)}吗?`)
		.then(() => {
			console.log("确认")
		})
		.catch(() => {
			console.log("取消")
		})
}
const getList = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				items: [
					{
						id: 1,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "1",
						date2: "2",
						custom: "3",
						children: [
							// {
							// 	id: "1-1",
							// 	name: "张三",
							// 	phone: "17688886666 ",
							// 	switch: "1",
							// 	radio: "1",
							// 	date1: "2",
							// 	date2: "2",
							// 	custom: "3"
							// }
						]
					},
					{
						id: 2,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 3,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 4,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 5,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 6,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 7,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 8,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 9,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 10,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 11,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					},
					{
						id: 12,
						name: "张三",
						phone: "17688886666 ",
						switch: "1",
						radio: "1",
						statusStr: "2",
						date2: "2",
						custom: "3"
					}
				],
				total: 12
			})
		})
	})
}
// 表单提交
const onSubmit = () => {
	console.log(formRef.value)
	let form = formRef.value.form
	form.validate(async (res) => {
		if (res) {
			console.log("proform res ===", res, formModel.value)
		}
	})
}
onMounted(() => {
	sourceData.value = [
		{ label: "在线", value: 1 },
		{ label: "离线", value: 0 }
	]
})
</script>

<style scoped lang="scss"></style>
