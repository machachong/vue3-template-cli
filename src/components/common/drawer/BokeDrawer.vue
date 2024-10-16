<template>
	<el-drawer
		ref="drawer"
		:title="title"
		:size="size"
		:model-value="value"
		:append-to-body="true"
		@open="handleOpen"
		@close="handleClose"
		:destroy-on-close="destroyOnClose"
		:with-header="withHeader"
		v-bind="$attrs"
	>
		<template #header>
			<div v-if="!slots['title'] && !slots['header']">
				<boke-title>{{ title }}</boke-title>
			</div>
			<slot name="title" v-if="slots['title']"></slot>
			<slot name="header" v-if="slots['header']"></slot>
		</template>

		<template #default>
			<slot></slot>
		</template>
		<template #footer>
			<slot name="footer"></slot>
		</template>
	</el-drawer>
</template>

<script setup>
import { useSlots } from "vue"
import { ElDrawer } from "element-plus"

defineProps({
	value: {
		type: Boolean,
		default() {
			return false
		}
	},
	size: {
		type: String,
		default() {
			return "50%"
		}
	},
	title: {
		type: String,
		default() {
			return "抽屉弹框"
		}
	},
	destroyOnClose: {
		type: Boolean,
		default() {
			return false
		}
	},
	withHeader: {
		type: Boolean,
		default() {
			return true
		}
	}
})
const slots = useSlots()
const emits = defineEmits(["open", "update:value", "close"])
const handleClose = () => {
	emits("update:value", false)
	emits("close")
}
const handleOpen = () => {
	emits("open")
}
</script>
