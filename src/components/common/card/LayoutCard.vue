<template>
	<el-card shadow="always" class="box-card" :class="{ 'box-card-dark': isDark }">
		<template #header v-if="showHeader">
			<slot name="header"></slot>
		</template>

		<template #default>
			<slot name="content"></slot>
		</template>
	</el-card>
</template>

<script setup>
import { isDark } from "@/composables"
defineProps({
	showHeader: {
		type: Boolean,
		default: false
	}
})
</script>
<style lang="scss" scoped>
.box-card {
	border: none;
	border-radius: 8px;
	background-color: var(--boke-card-bg);
	// height: 100%;
	box-sizing: border-box;
	&.box-card-dark {
		border: 1px solid #2970ff;
		box-shadow: 0px 4px 4px 0px rgba(41, 112, 255, 0.09) inset;
	}
}
</style>
