<template>
	<el-select
		:class="{ 'my-select-filterable': filterable && !inputFilter }"
		v-if="selectShow"
		ref="selection"
		:value-key="itemValue"
		:model-value="modelValue"
		:placeholder="placeholder"
		:size="size"
		:clearable="clearable"
		:multiple="multiple"
		:collapse-tags="collapseTags"
		:allow-create="allowCreate"
		:default-first-option="defaultFirstOption"
		@clear="handleClear"
		@change="handleChange"
		:filterable="!inputFilter && filterable"
		remote
		remote-show-suffix
		:remote-method="handleFilter"
		:reserve-keyword="reserveKeyword"
		@visible-change="
			(val) => {
				!val && restoreOptions()
				if (!val) {
					query = ''
				}
			}
		"
		:disabled="disabled"
		:popper-class="
			inputFilter || allowChooseAll ? 'my-select-dropdown-input' : 'my-select-dropdown'
		"
		:style="{ width: width ? width : '' }"
		v-bind="$attrs"
	>
		<template #prefix v-if="$slots.prefix">
			<slot name="prefix"></slot>
		</template>
		<div class="input-filter" v-if="inputFilter">
			<el-option key="filter-input" :disabled="true" value="">
				<el-input
					v-model="query"
					@input="handleFilter"
					@clear="handleClear"
					size="small"
					:clearable="true"
					placeholder="输入搜索"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><search /></el-icon>
					</template>
				</el-input>
			</el-option>
		</div>
		<div class="input-filter" v-if="allowChooseAll">
			<el-option key="choose-input" :disabled="true" value="">
				<el-checkbox
					:indeterminate="isIndeterminate"
					v-model="checkAll"
					@change="handleCheckAllChange"
					>全选</el-checkbox
				>
			</el-option>
		</div>
		<div
			:class="{
				'el-select-dropdown__wrap': inputFilter || allowChooseAll,
				'my-select-options': inputFilter || allowChooseAll
			}"
		>
			<template v-if="!isGroup">
				<el-option
					v-for="(item, index) in filterShowOptions"
					:key="index"
					:label="item[itemLabel]"
					:value="item[itemValue]"
					:disabled="item.disabled"
				>
					<!-- <slot :item="item"></slot> -->
					<span style="float: left">{{ item[itemLabel] }}</span>
					<!-- 为下拉选项添加说明信息 -->
					<span v-if="isDesc" style="float: right; color: var(--el-text-color-secondary)">{{
						item[itemDesc]
					}}</span>
				</el-option>
			</template>
			<template v-if="isGroup">
				<el-option-group
					v-for="group in filterOptions"
					:key="group[groupKey]"
					:label="group[groupLabel]"
				>
					<el-option
						v-for="(item, index) in group[groupOptions]"
						:key="index"
						:label="item[itemLabel]"
						:value="item[itemValue]"
						:disabled="item.disabled"
					/>
				</el-option-group>
			</template>
		</div>
	</el-select>
</template>

<script>
import { defineComponent, watch, ref, onMounted, reactive, toRefs, nextTick, computed } from "vue"
import { filterName } from "@/utils/tools/utils"

export default defineComponent({
	name: "MySelect",
	props: {
		modelValue: {
			type: [Number, String, Array],
			default() {
				return ""
			}
		},
		options: {
			type: Array,
			default() {
				return []
			}
		},
		placeholder: {
			type: String,
			default() {
				return "请选择"
			}
		},
		clearable: {
			type: Boolean,
			default() {
				return false
			}
		},
		disabled: {
			type: Boolean,
			default() {
				return false
			}
		},
		size: {
			type: String,
			default() {
				return ""
			}
		},
		multiple: {
			type: Boolean,
			default() {
				return false
			}
		},
		allowChooseAll: Boolean,
		collapseTags: {
			type: Boolean,
			default() {
				return false
			}
		},
		allowCreate: {
			type: Boolean,
			default() {
				return false
			}
		},
		defaultFirstOption: {
			type: Boolean,
			default() {
				return false
			}
		},
		itemKey: {
			type: String,
			default() {
				return "id"
			}
		},
		itemLabel: {
			type: String,
			default() {
				return "label"
			}
		},
		itemValue: {
			type: String,
			default() {
				return "value"
			}
		},
		itemDesc: {
			type: String,
			default() {
				return "desc"
			}
		},
		// 是否需要详情
		isDesc: {
			type: Boolean,
			default() {
				return false
			}
		},
		// 是否通过输入框筛选
		inputFilter: Boolean,
		// 是否可筛选
		filterable: {
			type: Boolean,
			default() {
				return true
			}
		},
		// 是否是分组
		isGroup: Boolean,
		groupKey: {
			type: String,
			default() {
				return "label"
			}
		},
		groupLabel: {
			type: String,
			default() {
				return "label"
			}
		},
		groupOptions: {
			type: String,
			default() {
				return "options"
			}
		},
		width: {
			type: String,
			default() {
				return ""
			}
		},
		// 默认列表最大个数
		limit: {
			type: Number,
			default() {
				return 200
			}
		}
	},
	emits: ["change", "update:modelValue"],
	setup(props, ctx) {
		const selection = ref(null)

		const filterOptions = ref(props.options)

		const filterShowOptions = computed(() => {
			// 如果是多选或者分组，则返回全部选项，如果不是多选，只返回limit个数的选项
			if (props.multiple || props.isGroup) {
				return filterOptions.value
			} else {
				// 处理当前值的选项
				const valueItem = filterOptions.value.find((item) => {
					return item[props.itemValue] == props.modelValue
				})
				const filterLimitOptions = filterOptions.value.filter((_, index) => index < props.limit)
				/*
            如果当前值在筛选列表中存在但在limit列表中不存在，则limit列表要加上该选项
            不这么处理，在编辑表单的时候会因为绑定值不存在于列表中而渲染错误
          */
				if (
					valueItem &&
					filterLimitOptions.findIndex((item) => item[props.itemValue] == props.modelValue) == -1
				) {
					return [valueItem].concat(filterLimitOptions)
				}
				return filterLimitOptions
			}
		})

		watch(
			() => props.options,
			() => {
				filterOptions.value = props.options
				if (props.allowChooseAll) {
					handleCheckChange(props.values)
				}
			},
			{
				deep: true
			}
		)

		const reserveKeyword = ref(props.multiple ? true : false)

		// function getFilterOptions(query) {
		// 	const options = props.options
		// 		.filter((item) => {
		// 			return filterName(item[props.itemLabel], query)
		// 		})
		// 		.map((item) => {
		// 			return {
		// 				...item,
		// 				filter_index: filterNameIndex(item[props.itemLabel], query)
		// 			}
		// 		})
		// 	const sortBy = () => {
		// 		return (a, b) => {
		// 			return a["filter_index"] < b["filter_index"] ? -1 : 1
		// 		}
		// 	}
		// 	return options.sort(sortBy())
		// }

		function handleFilter(query) {
			if (query !== "") {
				if (!props.allowCreate) {
					if (!props.isGroup) {
						filterOptions.value = props.options.filter((item) => {
							return filterName(item[props.itemLabel], query)
						})
					} else {
						filterOptions.value = props.options
							.map((group) => {
								const newGroup = {
									...group
								}
								newGroup[props.groupOptions] = newGroup[props.groupOptions].filter((item) => {
									return filterName(item[props.itemLabel], query)
								})
								return newGroup
							})
							.filter((group) => {
								return group[props.groupOptions].length > 0
							})
					}
				} else {
					if (props.inputFilter) {
						const newItem = {}
						newItem[props.itemKey] = query
						newItem[props.itemLabel] = query
						newItem[props.itemValue] = query

						filterOptions.value = props.options.filter((item) => {
							return filterName(item[props.itemLabel], query)
						})
						filterOptions.value.unshift(newItem)
					} else {
						if (!props.isGroup) {
							filterOptions.value = props.options.filter((item) => {
								return filterName(item[props.itemLabel], query)
							})
						} else {
							filterOptions.value = props.options
								.map((group) => {
									const newGroup = {
										...group
									}
									newGroup[props.groupOptions] = newGroup[props.groupOptions].filter((item) => {
										return filterName(item[props.itemLabel], query)
									})
									return newGroup
								})
								.filter((group) => {
									return group[props.groupOptions].length > 0
								})
						}
					}
				}
				if (filterOptions.value.length <= 1) {
					reserveKeyword.value = false
				} else {
					reserveKeyword.value = true
				}
			} else {
				filterOptions.value = props.options
			}
			nextTick(() => {
				selection.value.hoverIndex = -1
			})
		}

		function handleClear() {
			filterOptions.value = props.options
		}

		const query = ref("")

		function handleChange(val) {
			ctx.emit("update:modelValue", val)
			ctx.emit("change", val)
			if (props.allowChooseAll) {
				handleCheckChange(val)
			}
			// 选择之后清空筛选
			// if (props.multiple) {
			//   if (filterOptions.value.length <= 1) {
			//     filterOptions.value = props.options;
			//   }
			//   else if (filterOptions.value.length === val.length) {
			//     filterOptions.value = props.options;
			//   }
			// }
		}

		const selectShow = ref(true)

		function restoreOptions() {
			// 延迟清除，防止闪屏
			setTimeout(() => {
				filterOptions.value = props.options
				selectShow.value = false
				// 必须刷新，解决↑↓键的错位问题
				nextTick(() => {
					selectShow.value = true
				})
			}, 200)
		}

		const chooseState = reactive({
			isIndeterminate: true,
			checkAll: false
		})

		function handleCheckAllChange(val) {
			if (val) {
				const list = []
				props.options.forEach((item) => {
					list.push(item[props.itemValue])
				})
				ctx.emit("update:modelValue", list)
				// ctx.emit("change", list);
			} else {
				ctx.emit("update:modelValue", [])
				// ctx.emit("change", []);
			}
			chooseState.isIndeterminate = false
		}

		function handleCheckChange(val) {
			let checkedCount = val ? val.length : 0
			chooseState.checkAll = checkedCount === props.options.length
			chooseState.isIndeterminate = checkedCount > 0 && checkedCount < props.options.length
		}

		onMounted(() => {
			if (props.allowChooseAll) {
				handleCheckChange(props.modelValue)
			}
		})

		return {
			selectShow,
			selection,

			filterOptions,
			filterShowOptions,
			reserveKeyword,
			handleFilter,
			handleChange,
			restoreOptions,
			handleClear,
			query,
			...toRefs(chooseState),
			handleCheckAllChange
		}
	}
})
</script>

<style scoped>
.el-input {
	width: 100%;
}

.el-checkbox {
	width: 100%;
}

.input-filter {
	position: absolute;
	top: 0;
	z-index: 1000;
	background-color: #fff;
	width: 100%;
}

.input-filter :deep(.el-select-dropdown__item) {
	padding: 0 20px;
}

.options {
	margin-top: 50px;
	overflow-y: auto;
	max-height: 200px;
}

.el-scrollbar__bar::-webkit-scrollbar {
	display: none;
}

.el-select-dropdown__wrap {
	max-height: 274px;
}

.el-select-dropdown__wrap.my-select-options {
	margin-top: 34px;
	overflow-y: auto;
	max-height: 240px;
}

.my-select-options::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
	height: 4px;
}

.my-select-options::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(0, 0, 0, 0.2);
}
.my-select-options::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.1);
}

.el-scrollbar__bar.is-vertical {
	display: none;
}

@media screen and (max-width: 800px) {
	.el-select-dropdown__wrap.my-select-options {
		max-height: 225px;
	}
}
</style>
