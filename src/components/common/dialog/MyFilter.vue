<template>
	<div class="filter-area">
		<div class="filter-area__form">
			<slot :labelWidth="labelWidth" :width="width"></slot>
		</div>
		<div class="filter-area__buttons">
			<div>
				<el-button type="primary" :icon="Search" @click="onSearch" width="86px">查询</el-button>
			</div>
			<div style="margin-top: 5px">
				<el-button type="default" :icon="Refresh" @click="onReset" width="86px">重置</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue"
import { Search, Refresh } from "@element-plus/icons-vue"

export default defineComponent({
	name: "MyFilter",
	emits: ["search", "reset"],
	props: {
		labelWidth: {
			type: [String, Number],
			default() {
				return "100px"
			}
		},
		width: {
			type: [String, Number],
			default() {
				return "200px"
			}
		}
	},
	setup(_, ctx) {
		const onSearch = () => {
			ctx.emit("search")
		}

		const onReset = () => {
			ctx.emit("reset")
		}

		return { Search, Refresh, onSearch, onReset }
	}
})
</script>

<style scoped>
.filter-area {
	display: flex;
	flex-flow: row nowrap;
}

.filter-area__form {
	flex: 1;
	overflow: hidden;
	padding: 5px 0;
	border-right: 1px solid #d8d8d8;
}

.filter-area__buttons {
	width: 120px;
	padding: 0px 0 0px 20px;
	display: flex;
	flex-flow: column;
	/* justify-content: center; */
	justify-content: space-between;
}
</style>
<style>
.filter-area .el-input:not(:focus-within) {
	--el-input-bg-color: var(--my-base-bg);
}
.filter-area .el-date-editor:not(:focus-within) {
	--el-input-bg-color: var(--my-base-bg);
}
.filter-area .el-date-editor--daterange {
	--el-date-editor-width: 228px;
	--el-date-editor-daterange-width: 228px;
}
</style>
