<template>
	<el-dialog
		:model-value="value"
		:top="top"
		:width="width"
		:fullscreen="fullScreen || !getMinWidth()"
		:title="title"
		:append-to-body="appendToBody"
		:destroy-on-close="destroyOnClose"
		draggable
		@close="closeDialog"
		@open="openDialog"
	>
		<template #header>
			<el-space alignment="center">
				<boke-title h3 mode="list">{{ title }}</boke-title>
				<div
					class="my-dialog-btn"
					@click="handleFullScreen(true)"
					title="点击全屏"
					v-if="!fullScreen && getMinWidth()"
				>
					<el-icon><FullScreen /></el-icon>
				</div>
				<div
					class="my-dialog-btn"
					@click="handleFullScreen(false)"
					title="点击退出全屏"
					v-if="fullScreen && getMinWidth()"
				>
					<el-icon><CopyDocument /></el-icon>
				</div>
			</el-space>
		</template>
		<slot></slot>
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref } from "vue"
import { getMinWidth } from "@/utils/tools"
const props = defineProps({
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
	value: {
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
	},
	destroyOnClose: {
		type: Boolean,
		default() {
			return false
		}
	},
	defaultFullScreen: {
		type: Boolean,
		default: false
	}
})
const emits = defineEmits(["update:value", "open", "close"])
const fullScreen = ref(props.defaultFullScreen)
const openDialog = () => {
	emits("open")
}
const closeDialog = () => {
	!props.defaultFullScreen ? (fullScreen.value = false) : null
	emits("update:value", false)
	emits("close")
}

const handleFullScreen = (val) => {
	fullScreen.value = val
	emits("fullScreen", val)
}
</script>
<style scoped lang="scss">
.my-dialog-btn {
	position: absolute;
	top: 0px;
	right: 40px;
	width: 30px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	cursor: pointer;
	font-size: 16px;
	color: var(--boke-color-text-title);
}
.my-dialog-btn:hover {
	color: var(--boke-color-main);
}
.el-dialog {
	.boke-title {
		padding: 0;
		font-family: "puhui-medium";
	}
}
</style>
