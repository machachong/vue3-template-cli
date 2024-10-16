<template>
	<el-popconfirm
		width="220"
		confirm-button-text="确定"
		cancel-button-text="取消"
		:icon="WarningFilled"
		icon-color="#ff4557"
		:title="title"
		popper-class="boke-popconfirm"
		@confirm="emits('confirm')"
		@cancel="emits('cancel')"
		v-bind="$attrs"
	>
		<template #reference>
			<slot></slot>
		</template>
	</el-popconfirm>
</template>

<script setup>
import { WarningFilled } from "@element-plus/icons-vue"
defineProps({
	title: {
		type: String,
		default: ""
	}
})
const emits = defineEmits(["confirm", "cancel"])
</script>

<style scoped lang="scss"></style>
