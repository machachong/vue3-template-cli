<!-- 分页组件 -->
<template>
	<div :class="{ hidden: hidden }" class="pagination-container">
		<el-pagination
			:background="background"
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:layout="layout"
			:page-sizes="pageSizes"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
	total: {
		required: true,
		type: Number,
		default: 0
	},
	page: {
		type: Number,
		default: 1
	},
	size: {
		type: Number,
		default: 10
	},
	pageSizes: {
		type: Array,
		default() {
			return [10, 15, 30, 50, 100]
		}
	},
	layout: {
		type: String,
		default: "total, sizes, prev, pager, next, jumper"
	},
	background: {
		type: Boolean,
		default: false
	},
	hidden: {
		type: Boolean,
		default: false
	}
})

const emit = defineEmits(["update:page", "update:size", "pageChange", "sizeChange"])

const currentPage = computed({
	get: () => props.page,
	set: (value) => {
		emit("update:page", value)
	}
})

const pageSize = computed({
	get() {
		return props.size
	},
	set(val) {
		emit("update:size", val)
	}
})

const handleSizeChange = (val) => {
	emit("sizeChange", { page: currentPage.value, size: val })
}

const handleCurrentChange = (val) => {
	currentPage.value = val
	emit("pageChange", { page: val, size: props.size })
}
</script>

<style scoped lang="scss">
.pagination-container {
	padding: 20px 0px 0;
	display: flex;
	justify-content: flex-end;
}

.pagination-container.hidden {
	display: none;
}
</style>
