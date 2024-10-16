<template>
	<el-dialog
		:model-value="dialogVisible"
		:top="top"
		:width="width"
		:fullscreen="fullScreen || !getMinWidth()"
		:title="title"
		:append-to-body="appendToBody"
		draggable
		@close="closeDialog"
		:destroy-on-close="true"
	>
		<template #header>
			<!-- <span class="my-dialog-title">{{ title }}</span> -->
			<boke-title h3 inline-block>{{ title }}</boke-title>
			<button
				class="my-dialog-btn"
				@click="handleFullScreen(true)"
				title="点击全屏"
				v-if="!fullScreen && getMinWidth()"
			>
				<el-icon><FullScreen /></el-icon>
			</button>
			<button
				class="my-dialog-btn"
				@click="handleFullScreen(false)"
				title="点击退出全屏"
				v-if="fullScreen && getMinWidth()"
			>
				<el-icon><CopyDocument /></el-icon>
			</button>
		</template>
		<slot name="content"></slot>
	</el-dialog>
</template>

<script setup>
import { ref } from "vue"
import { FullScreen, CopyDocument } from "@element-plus/icons-vue"
import { getMinWidth } from "@/utils/tools/utils.js"
const emits = defineEmits(["update:dialogVisible", "closeDialog"])

defineProps({
	title: {
		type: String,
		default: ""
	},
	top: {
		type: String,
		default() {
			return "100px"
		}
	},
	width: {
		type: String,
		default() {
			return "1000px"
		}
	},
	dialogVisible: {
		type: Boolean,
		default() {
			return false
		}
	},
	appendToBody: {
		type: Boolean,
		default() {
			return true
		}
	}
})

const closeDialog = () => {
	fullScreen.value = false
	emits("update:dialogVisible", false)
	emits("closeDialog")
}

const fullScreen = ref(false)

const handleFullScreen = (val) => {
	fullScreen.value = val
	emits("fullScreen", val)
}
</script>
<style scoped>
.el-button--text {
	margin-right: 15px;
}
.el-select {
	width: 300px;
}
.el-input {
	width: 300px;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}

.my-dialog-btn {
	position: absolute;
	top: 22px;
	right: 47px;
	padding: 0;
	background: 0 0;
	border: none;
	outline: 0;
	cursor: pointer;
	font-size: 16px;
	color: #909399;
}

.el-dialog__headerbtn {
	position: absolute;
	top: 15px;
	right: 15px;
	padding: 0;
	/* width: 54px;
    height: 54px; */
	background: 0 0;
	border: none;
	outline: 0;
	cursor: pointer;
	font-size: var(--el-message-close-size, 16px);
}
.my-dialog-btn:hover {
	color: #409eff;
}
</style>
