<template>
	<el-popover
		ref="popRef"
		v-model:visible="showPopover"
		placement="bottom"
		title="选择字段"
		width="220px"
		:hide-after="100"
		trigger="click"
		size="small"
		popper-class="choose-column"
		v-bind="$attrs"
		@hide="handleClose"
	>
		<template #title>
			<span style="font-size: 14px">选择字段</span>
		</template>
		<choose-column
			v-model="selected"
			:options="options"
			@change="handleCheckedChange"
			@sort-options="sortOptions"
		></choose-column>
		<div class="choose-column-footer">
			<div class="choose-all-button">
				<el-checkbox
					:indeterminate="isIndeterminate"
					v-model="checkAll"
					size="small"
					@change="handleCheckAllChange"
				>
					全选
				</el-checkbox>
			</div>
			<div>
				<el-button size="small" @click="handleClose">取消</el-button>
				<el-button size="small" type="primary" @click="handleSubmit"> 确认 </el-button>
			</div>
		</div>
		<template #reference>
			<div class="choose-column-menu my-primary">
				<i class="iconfont icon-liebiaosousuo"></i>
				<span>已选字段({{ selected.length }}/{{ newOptions.length }})</span>
			</div>
		</template>
	</el-popover>
</template>

<script>
import ChooseColumn from "@/components/common/choose_column/ChooseColumn.vue"
import { systemPre } from "@/utils/config/settings"
export default defineComponent({
	name: "ChooseColumnMenu",
	components: {
		ChooseColumn
	},
	props: {
		currentColumns: {
			// 选中的展示列的值
			type: Array,
			default() {
				return []
			}
		},
		options: {
			// 选项
			type: Array,
			default() {
				return []
			}
		}
	},
	emits: ["sortOptions", "submited"],
	setup(props, ctx) {
		const popRef = ref(false)

		const showPopover = ref(false)

		const state = reactive({
			isIndeterminate: true,
			checkAll: false,
			selected: props.currentColumns,
			newOptions: props.options
		})

		function handleCheckAllChange(val) {
			if (val) {
				state.selected = props.options.map((item) => {
					return item["value"]
				})
			} else {
				state.selected = []
			}
			state.isIndeterminate = false
		}

		function handleCheckedChange() {
			let checkedCount = state.selected.length
			state.checkAll = checkedCount === props.options.length
			state.isIndeterminate = checkedCount > 0 && checkedCount < props.options.length
		}

		function sortOptions(options) {
			ctx.emit("sortOptions", options)
			// 存储新的排序过的选项
			state.newOptions = JSON.parse(JSON.stringify(options))
		}

		function handleSubmit() {
			const currentInfo = {}
			currentInfo.selected = state.selected
			currentInfo.sortedOptions = state.newOptions
			ctx.emit("submited", currentInfo)
			saveSelected(state.selected)
			handleClose()
		}

		function handleClose() {
			state.selected = props.currentColumns
			handleCheckedChange()
			showPopover.value = false
		}
		/*
      2023-03-13新增 对选择的列进行持久化
    */

		const route = useRoute()
		console.log(systemPre)
		const storageSaveKey = computed(() => {
			return systemPre + (props.storageKey || route.name)
		})

		function saveSelected(val) {
			localStorage.setItem(storageSaveKey.value, JSON.stringify(val))
		}
		function handleSelectedInit() {
			if (localStorage.getItem(storageSaveKey.value)) {
				const selectedValue = JSON.parse(localStorage.getItem(storageSaveKey.value))
				const _props = {}
				_props.selected = selectedValue
				_props.sortedOptions = props.options
				ctx.emit("submited", _props)
			}
		}
		watch(
			() => props.currentColumns,
			() => {
				state.selected = props.currentColumns
				handleCheckedChange()
			},
			{
				deep: true
			}
		)

		onMounted(() => {
			handleCheckedChange()
			handleSelectedInit()
		})

		return {
			popRef,
			showPopover,
			...toRefs(state),
			sortOptions,
			handleCheckAllChange,
			handleCheckedChange,
			handleSubmit,
			handleClose
		}
	}
})
</script>

<style scoped lang="scss">
.choose-column-menu {
	min-width: 100px;
	font-size: 14px;
	cursor: pointer;
	line-height: 36px;
	background: var(--boke-table-th-bg);
	color: var(--boke-color-text-title);
	padding: 0 20px;
	i {
		font-size: 12px;
		color: var(--boke-color-text-title);
	}
}

.choose-column-menu span {
	padding-left: 10px;
}

.up {
	transition: all 0.5s;
}

.down {
	transform: rotate(-180deg);
	transition: all 0.5s;
}

.choose-column-footer {
	margin-top: 5px;
	padding: 5px;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
}
</style>
