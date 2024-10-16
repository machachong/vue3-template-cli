<template>
	<div style="width: 100%">
		<el-input
			v-model="state.query"
			size="small"
			:prefix-icon="Search"
			:clearable="true"
			placeholder="搜索字段"
		>
		</el-input>
		<div style="height: 300px" class="my-scroll choose-column-list">
			<el-checkbox-group :model-value="modelValue" @change="handleChange" size="small">
				<el-checkbox
					v-for="item in selectionFilter"
					:key="item['value']"
					:label="item['value']"
					:checked="modelValue.indexOf(item['value']) > -1"
				>
					{{ item["label"] }}
				</el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue"
import { filterName } from "@/utils/tools/utils.js"
const state = reactive({
	query: "",
	list: []
})

const emits = defineEmits(["update:modelValue", "sortOptions", "change"])

const props = defineProps({
	modelValue: {
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
})

const selectionFilter = computed(() => {
	if (state.query) {
		return props.options.filter((item) => {
			return filterName(item["label"], state.query)
		})
	}
	return props.options
})

const handleChange = (val) => {
	emits("update:modelValue", val)
	emits("change", val)
}
</script>

<style scoped>
.choose-column-list {
	overflow-x: auto;
	overflow-y: auto;
	margin-top: 5px;
	border-bottom: 1px solid #e6e6e6;
}

.choose-column-list ul {
	padding-inline-start: 0px;
	margin: 0;
}

.choose-column-list li {
	list-style: none;
}

.el-checkbox {
	display: block;
	padding: 5px;
}
</style>
